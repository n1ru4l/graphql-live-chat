/* tslint:disable */
/* eslint-disable */
/* @relayHash d5b221445c6fa0ba811a4f14629058b9 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type appSubscriptionVariables = {};
export type appSubscriptionResponse = {
    readonly live: {
        readonly query: {
            readonly " $fragmentRefs": FragmentRefs<"chat_app">;
        } | null;
        readonly patch: ReadonlyArray<{
            readonly op: string;
            readonly path: string;
            readonly from: string | null;
            readonly value: unknown | null;
        }> | null;
    } | null;
};
export type appSubscription = {
    readonly response: appSubscriptionResponse;
    readonly variables: appSubscriptionVariables;
};



/*
subscription appSubscription {
  live {
    query {
      ...chat_app
    }
    patch {
      op
      path
      from
      value
    }
  }
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

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "patch",
  "storageKey": null,
  "args": null,
  "concreteType": "RFC6902Operation",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "op",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "path",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "from",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "value",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "appSubscription",
    "type": "Subscription",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "live",
        "storageKey": null,
        "args": null,
        "concreteType": "LiveSubscription",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "query",
            "storageKey": null,
            "args": null,
            "concreteType": "Query",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "chat_app",
                "args": null
              }
            ]
          },
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "appSubscription",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "live",
        "storageKey": null,
        "args": null,
        "concreteType": "LiveSubscription",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "query",
            "storageKey": null,
            "args": null,
            "concreteType": "Query",
            "plural": false,
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
          (v0/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "subscription",
    "name": "appSubscription",
    "id": null,
    "text": "subscription appSubscription {\n  live {\n    query {\n      ...chat_app\n    }\n    patch {\n      op\n      path\n      from\n      value\n    }\n  }\n}\n\nfragment chatMessage_message on Message {\n  id\n  authorName\n  rawContent\n  createdAt\n}\n\nfragment chat_app on Query {\n  messages {\n    id\n    ...chatMessage_message\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b700ddbdde79149f6a52c03f3c25de94';
export default node;
