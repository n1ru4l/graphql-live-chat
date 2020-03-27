/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type chatMessage_message = {
    readonly id: string;
    readonly authorName: string;
    readonly rawContent: string;
    readonly createdAt: string;
    readonly " $refType": "chatMessage_message";
};
export type chatMessage_message$data = chatMessage_message;
export type chatMessage_message$key = {
    readonly " $data"?: chatMessage_message$data;
    readonly " $fragmentRefs": FragmentRefs<"chatMessage_message">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "chatMessage_message",
  "type": "Message",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "authorName",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "rawContent",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "createdAt",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '961fc1422ef53556ea46829957905b07';
export default node;
