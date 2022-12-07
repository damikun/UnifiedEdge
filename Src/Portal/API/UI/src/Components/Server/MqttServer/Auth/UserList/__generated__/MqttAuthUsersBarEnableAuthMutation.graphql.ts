/**
 * @generated SignedSource<<87b1c6d70a5d8c306e23cff5b5700538>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttUserAuthInput = {
  enable: boolean;
  server_uid: string;
};
export type MqttAuthUsersBarEnableAuthMutation$variables = {
  input: EnableMqttUserAuthInput;
};
export type MqttAuthUsersBarEnableAuthMutation$data = {
  readonly enableMqttUserAuth: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttAuthCfg: {
      readonly clientAuthEnabled: boolean;
      readonly id: string;
      readonly userAuthEnabled: boolean;
    } | null;
  };
};
export type MqttAuthUsersBarEnableAuthMutation = {
  response: MqttAuthUsersBarEnableAuthMutation$data;
  variables: MqttAuthUsersBarEnableAuthMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EnableMqttUserAuthPayload",
    "kind": "LinkedField",
    "name": "enableMqttUserAuth",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttAuthCfg",
        "kind": "LinkedField",
        "name": "gQL_MqttAuthCfg",
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
            "name": "clientAuthEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userAuthEnabled",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "errors",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ErrorSource",
                "kind": "LinkedField",
                "name": "errors",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "property",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "ValidationError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/)
            ],
            "type": "ResultError",
            "abstractKey": "__isResultError"
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
    "name": "MqttAuthUsersBarEnableAuthMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUsersBarEnableAuthMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9cfd26168b72197858dea66617ecc817",
    "id": null,
    "metadata": {},
    "name": "MqttAuthUsersBarEnableAuthMutation",
    "operationKind": "mutation",
    "text": "mutation MqttAuthUsersBarEnableAuthMutation(\n  $input: EnableMqttUserAuthInput!\n) {\n  enableMqttUserAuth(input: $input) {\n    gQL_MqttAuthCfg {\n      id\n      clientAuthEnabled\n      userAuthEnabled\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "935e91efb7fa29ba5f92fdf0375f198d";

export default node;
