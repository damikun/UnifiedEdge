/**
 * @generated SignedSource<<04894ed321015c14091e2712a3ee309b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveUserInput = {
  user_id: string;
};
export type UserRemoveUpdateMutation$variables = {
  input: RemoveUserInput;
};
export type UserRemoveUpdateMutation$data = {
  readonly removeUser: {
    readonly gQL_User: {
      readonly id: string;
    } | null;
  };
};
export type UserRemoveUpdateMutation = {
  response: UserRemoveUpdateMutation$data;
  variables: UserRemoveUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RemoveUserPayload",
    "kind": "LinkedField",
    "name": "removeUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "gQL_User",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserRemoveUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserRemoveUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a2ea81806717d3d4ec9fcf22bcfb18c4",
    "id": null,
    "metadata": {},
    "name": "UserRemoveUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserRemoveUpdateMutation(\n  $input: RemoveUserInput!\n) {\n  removeUser(input: $input) {\n    gQL_User {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f7a49e520bf8e9d6d8aa7a5a1efe3d50";

export default node;
