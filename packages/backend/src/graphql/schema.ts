import { makeExecutableSchema } from "graphql-tools";
import { mergeResolvers } from "@graphql-toolkit/schema-merging";
import { mergeTypeDefs } from "@graphql-toolkit/schema-merging";
import * as LiveModule from "./modules/live";
import * as MessageModule from "./modules/message";

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([MessageModule.typeDefs, LiveModule.typeDefs]),
  resolvers: mergeResolvers<any, any>([
    MessageModule.resolvers,
    LiveModule.resolvers,
  ]),
});
