declare module "graphql-live-subscriptions" {
  import { EventEmitter } from "events";
  import { GraphQLObjectType, GraphQLType } from "graphql";

  type ILiveSubscriptionTypeDefOptions = {
    type?: string;
    queryType?: string;
    subscriptionName?: string;
  };
  declare function liveSubscriptionTypeDef(
    options: ILiveSubscriptionTypeDefOptions
  ): GraphQLObjectType;

  type ISubscribeToLiveDataOptions<TRoot, IContextType> = {
    initialState: (source: TRoot, args: any, context: IContextType) => any;
    eventEmitter: (
      source: TRoot,
      args: any,
      context: IContextType
    ) => EventEmitter;
    sourceRoots: {
      [typeName: string]: string[];
    };
  };
  declare function subscribeToLiveData<TRoot, IContextType>(
    options: ISubscribeToLiveDataOptions<TRoot, IContextType>
  ): AsyncIterator;

  declare var GraphQLLiveData: (opts: {
    name: string;
    type: GraphQLType;
    resumption?: boolean;
  }) => GraphQLObjectType;

  export { liveSubscriptionTypeDef, subscribeToLiveData, GraphQLLiveData };
}

// declare module "graphql-type-json/RFC6902Operation" {
//   import { GraphQLObjectType } from "graphql";

//   declare var RFC6902Operation: GraphQLObjectType;
//   export default RFC6902Operation;
// }
