import * as gql from "graphql";
import { EventEmitter } from "events";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { produce } from "immer";
import express = require("express");
import { IRootValueType, IContextType } from "./@types";
import { schema } from "./graphql/schema";
import { registerFakeUsers } from "./register-fake-users";
import { IMessageType } from "./graphql/modules/message";

const app = express();

const HOST = process.env.HOST || "0.0.0.0";
const PORT = parseInt(process.env.port || "3001", 10);

app.use(express.static("public"));
app.all("/", (_, response) => {
  response.redirect("/");
});

const httpServer = app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}.`);
});

let rootValue: IRootValueType = {
  messages: [],
};

const context: IContextType = {
  eventEmitter: new EventEmitter(),
  mutateState: (producer) => {
    rootValue = produce(rootValue, producer);
    context.eventEmitter.emit("update", { nextState: rootValue });
  },
  addMessage: (message: IMessageType) => {
    context.mutateState((root) => {
      if (root.messages.length > 100) {
        root.messages.splice(0, 1);
      }
      root.messages.push(message);
    });
  },
};

if (process.env.NODE_ENV === "development") {
  registerFakeUsers({ context });
}

const subscriptionServer = new SubscriptionServer(
  {
    execute: gql.execute,
    subscribe: gql.subscribe,
    schema: schema,
    rootValue: () => rootValue,
    onConnect: () => context,
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

const shutdownHandler = (() => {
  let isInvoked = false;
  return () => {
    if (isInvoked === true) return;
    isInvoked = true;

    subscriptionServer.close();

    httpServer.close((err) => {
      if (err) {
        console.error(err);
        process.exitCode = 1;
      }
    });
  };
})();

const errorExitHandler = (() => {
  let isInvoked = false;
  return () => {
    if (isInvoked === true) return;
    isInvoked = true;

    process.exitCode = 1;
    shutdownHandler();

    setTimeout(() => {
      process.exit(1);
    }, 5000).unref();
  };
})();

process.on("uncaughtException", () => {
  errorExitHandler();
});

process.on("unhandledRejection", () => {
  errorExitHandler();
});

process.on("SIGINT", shutdownHandler);
