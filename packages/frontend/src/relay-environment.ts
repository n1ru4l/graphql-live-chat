import React from "react";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  SubscribeFunction,
  Observable,
  GraphQLResponse,
} from "relay-runtime";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { RelayModernEnvironment } from "relay-runtime/lib/store/RelayModernEnvironment";

const fetchQuery = (client: SubscriptionClient): FetchFunction => (
  operation,
  variables
) => {
  if (!operation.text) throw new Error("Missing document.");
  const { text: query } = operation;

  return new Promise<GraphQLResponse>((resolve, reject) => {
    const subscription = client
      .request({
        query,
        variables,
      })
      .subscribe({
        next: (value) => {
          resolve(value as GraphQLResponse);
          subscription.unsubscribe();
        },
        error: reject,
      });
  });
};

const getWebSocketProtocol = (location: Location) =>
  location.protocol === "http:" ? "ws" : "wss";

const getWebSocketUrl = (location: Location) =>
  // prettier-ignore
  `${getWebSocketProtocol(location)}://${location.host}/graphql`;

// @source https://github.com/facebook/relay/issues/2967#issuecomment-567355735
const setupSubscription = (
  subscriptionClient: SubscriptionClient
): SubscribeFunction => (request, variables) => {
  if (!request.text) throw new Error("Missing document.");
  const { text: query } = request;

  return Observable.create((sink) => {
    const c = subscriptionClient
      .request({ query, variables })
      .subscribe(sink as any);
    return c as any;
  });
};

export const createEnvironment = () => {
  const client = new SubscriptionClient(getWebSocketUrl(window.location), {
    reconnect: true,
    reconnectionAttempts: 100000,
  });

  return new Environment({
    network: Network.create(fetchQuery(client), setupSubscription(client)),
    store: new Store(new RecordSource()),
  });
};

export const EnvironmentContext = React.createContext<RelayModernEnvironment | null>(
  null
);

export const useEnvironment = (): RelayModernEnvironment => {
  const environment = React.useContext(EnvironmentContext);
  if (!environment) throw new Error("Missing Environment");
  return environment;
};
