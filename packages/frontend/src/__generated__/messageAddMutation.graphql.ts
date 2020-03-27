/* tslint:disable */
/* eslint-disable */
/* @relayHash fda5a148c1642f758ac96a49b33af268 */

import { ConcreteRequest } from "relay-runtime";
export type MessageAddInput = {
    authorName: string;
    rawContent: string;
};
export type messageAddMutationVariables = {
    input: MessageAddInput;
};
export type messageAddMutationResponse = {
    readonly messageAdd: boolean | null;
};
export type messageAddMutation = {
    readonly response: messageAddMutationResponse;
    readonly variables: messageAddMutationVariables;
};



/*
mutation messageAddMutation(
  $input: MessageAddInput!
) {
  messageAdd(input: $input)
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "MessageAddInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "messageAdd",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "messageAddMutation",
    "type": "RootMutationType",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "messageAddMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "messageAddMutation",
    "id": null,
    "text": "mutation messageAddMutation(\n  $input: MessageAddInput!\n) {\n  messageAdd(input: $input)\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '07c75ee8e12b1d2e1d8c858e2fe16bb4';
export default node;
