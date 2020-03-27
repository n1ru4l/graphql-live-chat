import { EventEmitter } from "events";
import { IMessageType } from "./graphql/modules/message";

type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
  ? T
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type IRootValueType = {
  messages: IMessageType[];
};

export type RootValueType = IRootValueType;

export type IGetRootValueType = () => RootValueType;

export type IContextType = {
  eventEmitter: EventEmitter;
  mutateState: (producer: (root: IRootValueType) => void) => void;
  addMessage: (message: IMessageType) => void;
};
