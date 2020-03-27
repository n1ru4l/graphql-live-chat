import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IMessageType } from '../modules/message';
import { RootValueType, IContextType } from '../../@types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: unknown;
};


export type LiveSubscription = {
  readonly __typename: 'LiveSubscription';
  readonly query: Maybe<Query>;
  readonly patch: Maybe<ReadonlyArray<Rfc6902Operation>>;
};

export type Message = {
  readonly __typename: 'Message';
  readonly id: Scalars['ID'];
  readonly authorName: Scalars['String'];
  readonly rawContent: Scalars['String'];
  readonly createdAt: Scalars['String'];
};

export type MessageAddInput = {
  readonly authorName: Scalars['String'];
  readonly rawContent: Scalars['String'];
};

export type Mutation = {
  readonly __typename: 'Mutation';
  readonly messageAdd: Maybe<Scalars['Boolean']>;
};


export type MutationMessageAddArgs = {
  input: MessageAddInput;
};

export type Query = {
  readonly __typename: 'Query';
  readonly messages: ReadonlyArray<Message>;
};

export type Rfc6902Operation = {
  readonly __typename: 'RFC6902Operation';
  readonly op: Scalars['String'];
  readonly path: Scalars['String'];
  readonly from: Maybe<Scalars['String']>;
  readonly value: Maybe<Scalars['JSON']>;
};

export type Subscription = {
  readonly __typename: 'Subscription';
  readonly live: Maybe<LiveSubscription>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<RootValueType>,
  Message: ResolverTypeWrapper<IMessageType>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Mutation: ResolverTypeWrapper<RootValueType>,
  MessageAddInput: MessageAddInput,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Subscription: ResolverTypeWrapper<RootValueType>,
  LiveSubscription: ResolverTypeWrapper<RootValueType>,
  RFC6902Operation: ResolverTypeWrapper<Rfc6902Operation>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: RootValueType,
  Message: IMessageType,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Mutation: RootValueType,
  MessageAddInput: MessageAddInput,
  Boolean: Scalars['Boolean'],
  Subscription: RootValueType,
  LiveSubscription: RootValueType,
  RFC6902Operation: Rfc6902Operation,
  JSON: Scalars['JSON'],
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type LiveSubscriptionResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['LiveSubscription'] = ResolversParentTypes['LiveSubscription']> = {
  query: Resolver<Maybe<ResolversTypes['Query']>, ParentType, ContextType>,
  patch: Resolver<Maybe<ReadonlyArray<ResolversTypes['RFC6902Operation']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MessageResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  authorName: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  rawContent: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  messageAdd: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMessageAddArgs, 'input'>>,
};

export type QueryResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  messages: Resolver<ReadonlyArray<ResolversTypes['Message']>, ParentType, ContextType>,
};

export type Rfc6902OperationResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['RFC6902Operation'] = ResolversParentTypes['RFC6902Operation']> = {
  op: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  path: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  from: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  value: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = IContextType, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  live: SubscriptionResolver<Maybe<ResolversTypes['LiveSubscription']>, "live", ParentType, ContextType>,
};

export type Resolvers<ContextType = IContextType> = {
  JSON: GraphQLScalarType,
  LiveSubscription: LiveSubscriptionResolvers<ContextType>,
  Message: MessageResolvers<ContextType>,
  Mutation: MutationResolvers<ContextType>,
  Query: QueryResolvers<ContextType>,
  RFC6902Operation: Rfc6902OperationResolvers<ContextType>,
  Subscription: SubscriptionResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = IContextType> = Resolvers<ContextType>;
