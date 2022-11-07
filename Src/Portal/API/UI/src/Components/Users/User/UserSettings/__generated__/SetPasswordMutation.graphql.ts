/**
 * @generated SignedSource<<bee419113c4b58f7c39aca4cc0442b51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetUserPasswordInput = {
  current_password: string;
  new_password: string;
  user_id: string;
};
export type SetPasswordMutation$variables = {
  input: SetUserPasswordInput;
};
export type SetPasswordMutation$data = {
  readonly setUserPassword: {
    readonly gQL_User: {
      readonly id: string;
    } | null;
  };
};
export type SetPasswordMutation = {
  response: SetPasswordMutation$data;
  variables: SetPasswordMutation$variables;
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
    "concreteType": "SetUserPasswordPayload",
    "kind": "LinkedField",
    "name": "setUserPassword",
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
    "name": "SetPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "584c2954aeee3982dcebd4a361487b1b",
    "id": null,
    "metadata": {},
    "name": "SetPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation SetPasswordMutation(\n  $input: SetUserPasswordInput!\n) {\n  setUserPassword(input: $input) {\n    gQL_User {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a98330f4b22f2ffb91bab1d01415042";

export default node;
