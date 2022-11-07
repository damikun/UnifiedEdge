/**
 * @generated SignedSource<<835aa9dc7ca1a4e492bb8493c94fc303>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetUserAdminInput = {
  is_admin: boolean;
  user_id: string;
};
export type UserAdminSettingUpdateMutation$variables = {
  input: SetUserAdminInput;
  user_id: string;
};
export type UserAdminSettingUpdateMutation$data = {
  readonly setUserAdmin: {
    readonly gQL_User: {
      readonly enabled: boolean;
      readonly id: string;
    } | null;
    readonly query: {
      readonly isAdmin: {
        readonly isAdmin: boolean;
      };
    };
  };
};
export type UserAdminSettingUpdateMutation = {
  response: UserAdminSettingUpdateMutation$data;
  variables: UserAdminSettingUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user_id"
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
    "concreteType": "SetUserAdminPayload",
    "kind": "LinkedField",
    "name": "setUserAdmin",
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
            "name": "enabled",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Query",
        "kind": "LinkedField",
        "name": "query",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "user_id",
                "variableName": "user_id"
              }
            ],
            "concreteType": "IsAdminResult",
            "kind": "LinkedField",
            "name": "isAdmin",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAdmin",
                "storageKey": null
              }
            ],
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
    "name": "UserAdminSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserAdminSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f4e9228342926cea5d8b8341fa83de56",
    "id": null,
    "metadata": {},
    "name": "UserAdminSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserAdminSettingUpdateMutation(\n  $input: SetUserAdminInput!\n  $user_id: ID!\n) {\n  setUserAdmin(input: $input) {\n    gQL_User {\n      id\n      enabled\n    }\n    query {\n      isAdmin(user_id: $user_id) {\n        isAdmin\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "03e53290b14dc0ee3539352146f19beb";

export default node;
