import {
  MessageResolvers,
  QueryResolvers,
  MutationResolvers,
} from "../__generated__/graphql-types";
import { v4 as uuidV4 } from "uuid";

export const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    authorName: String!
    rawContent: String!
    createdAt: String!
  }

  input MessageAddInput {
    authorName: String!
    rawContent: String!
  }

  type Subscription

  type Query {
    messages: [Message!]!
  }

  type Mutation {
    messageAdd(input: MessageAddInput!): Boolean
  }
`;

export type IMessageType = {
  id: string;
  authorName: string;
  rawContent: string;
  createdAt: Date;
};

const Message: MessageResolvers = {
  id: (message) => message.id,
  authorName: (message) => message.authorName,
  rawContent: (message) => message.rawContent,
  createdAt: (message) => String(message.createdAt),
};

const messageAdd: MutationResolvers["messageAdd"] = (_, args, context) => {
  context.addMessage({
    id: uuidV4(),
    authorName: args.input.authorName,
    rawContent: args.input.rawContent,
    createdAt: new Date(),
  });
  return null;
};

const Mutation = { messageAdd };

const messages: QueryResolvers["messages"] = (root) => root.messages;

const Query = {
  messages,
};

export const resolvers = {
  Message,
  Mutation,
  Query,
};
