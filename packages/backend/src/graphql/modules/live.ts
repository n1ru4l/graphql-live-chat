import { subscribeToLiveData } from "graphql-live-subscriptions";
import GraphQLJSON from "graphql-type-json";
import { SubscriptionResolvers } from "../__generated__/graphql-types";
import { RootValueType, IContextType, IGetRootValueType } from "../../@types";

export const typeDefs = /* GraphQL */ `
  scalar JSON

  type RFC6902Operation {
    op: String!
    path: String!
    from: String
    value: JSON
  }

  type LiveSubscription {
    query: Query
    patch: [RFC6902Operation!]
  }

  type Subscription {
    live: LiveSubscription
  }

  type Mutation
  type Query
`;

const live: SubscriptionResolvers["live"] = {
  subscribe: subscribeToLiveData<RootValueType, IContextType>({
    initialState: (root) => root,
    eventEmitter: (root, args, context) => context.eventEmitter,
    sourceRoots: {},
  }),
  resolve: (root: RootValueType) => root,
};

export const resolvers = {
  JSON: GraphQLJSON,
  Subscription: { live },
};
