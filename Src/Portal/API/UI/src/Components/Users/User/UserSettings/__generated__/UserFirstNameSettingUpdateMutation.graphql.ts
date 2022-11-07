/**
 * @generated SignedSource<<247b5bcecc72acfe203c3608ddd6b31c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserFirstNameInput = {
  first_name: string;
  user_id: string;
};
export type UserFirstNameSettingUpdateMutation$variables = {
  input: UpdateUserFirstNameInput;
};
export type UserFirstNameSettingUpdateMutation$data = {
  readonly updateUserFirstName: {
    readonly gQL_User: {
      readonly firstName: string | null;
      readonly id: string;
    } | null;
  };
};
export type UserFirstNameSettingUpdateMutation = {
  response: UserFirstNameSettingUpdateMutation$data;
  variables: UserFirstNameSettingUpdateMutation$variables;
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
    "concreteType": "UpdateUserFirstNamePayload",
    "kind": "LinkedField",
    "name": "updateUserFirstName",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
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
    "name": "UserFirstNameSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFirstNameSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1faa97c9eddff5eb56ccb8a5944b9f7d",
    "id": null,
    "metadata": {},
    "name": "UserFirstNameSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserFirstNameSettingUpdateMutation(\n  $input: UpdateUserFirstNameInput!\n) {\n  updateUserFirstName(input: $input) {\n    gQL_User {\n      id\n      firstName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "48a81e2e621111d5f24cd788a37ca637";

export default node;
