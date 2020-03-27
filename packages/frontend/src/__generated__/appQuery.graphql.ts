/* tslint:disable */
/* eslint-disable */
/* @relayHash 22a6e1a1ee42b78d55a4e269b7c4880d */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appQueryVariables = {};
export type appQueryResponse = {
    readonly " $fragmentRefs": FragmentRefs<"chat_app">;
};
export type appQuery = {
    readonly response: appQueryResponse;
    readonly variables: appQueryVariables;
};



/*
query appQuery {
  ...chat_app
}

fragment chatMessage_message on Message {
  id
  authorName
  rawContent
  createdAt
}

fragment chat_app on Query {
  messages {
    id
    ...chatMessage_message
  }
}
*/

const node: ConcreteRequest = {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "appQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "chat_app",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "appQuery",
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
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "appQuery",
    "id": null,
    "text": "query appQuery {\n  ...chat_app\n}\n\nfragment chatMessage_message on Message {\n  id\n  authorName\n  rawContent\n  createdAt\n}\n\nfragment chat_app on Query {\n  messages {\n    id\n    ...chatMessage_message\n  }\n}\n",
    "metadata": {}
  }
};
(node as any).hash = 'ee5ac318cee3817f2b2011324b7a22eb';
export default node;
