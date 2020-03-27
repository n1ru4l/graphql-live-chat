/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type chat_app = {
    readonly messages: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"chatMessage_message">;
    }>;
    readonly " $refType": "chat_app";
};
export type chat_app$data = chat_app;
export type chat_app$key = {
    readonly " $data"?: chat_app$data;
    readonly " $fragmentRefs": FragmentRefs<"chat_app">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "chat_app",
  "type": "Query",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "messages",
      "storageKey": null,
      "args": null,
      "concreteType": "Message",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "chatMessage_message",
          "args": null
        }
      ]
    }
  ]
};
(node as any).hash = '64d7e086c03c981baa98a88cc55d1fb7';
export default node;
