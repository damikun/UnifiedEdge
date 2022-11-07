/**
 * @generated SignedSource<<0c000bd7f71323db2132af57b4223bff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserLastNameInput = {
  last_name: string;
  user_id: string;
};
export type UserLastNameSettingUpdateMutation$variables = {
  input: UpdateUserLastNameInput;
};
export type UserLastNameSettingUpdateMutation$data = {
  readonly updateUserLastName: {
    readonly gQL_User: {
      readonly id: string;
      readonly lastName: string | null;
    } | null;
  };
};
export type UserLastNameSettingUpdateMutation = {
  response: UserLastNameSettingUpdateMutation$data;
  variables: UserLastNameSettingUpdateMutation$variables;
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
    "concreteType": "UpdateUserLastNamePayload",
    "kind": "LinkedField",
    "name": "updateUserLastName",
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
            "name": "lastName",
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
    "name": "UserLastNameSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserLastNameSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3e125b1cce2b6592395d2eff005cf57f",
    "id": null,
    "metadata": {},
    "name": "UserLastNameSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserLastNameSettingUpdateMutation(\n  $input: UpdateUserLastNameInput!\n) {\n  updateUserLastName(input: $input) {\n    gQL_User {\n      id\n      lastName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "24ee00fe497b1f15f5d7a32ea12eb447";

export default node;
