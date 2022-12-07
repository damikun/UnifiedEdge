/**
 * @generated SignedSource<<9081e22b0a2794b27225a64d2213e427>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttClientAuthInput = {
  enable: boolean;
  server_uid: string;
};
export type MqttAuthClientsBarEnableAuthMutation$variables = {
  input: EnableMqttClientAuthInput;
};
export type MqttAuthClientsBarEnableAuthMutation$data = {
  readonly enableMqttClientAuth: {
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
export type MqttAuthClientsBarEnableAuthMutation = {
  response: MqttAuthClientsBarEnableAuthMutation$data;
  variables: MqttAuthClientsBarEnableAuthMutation$variables;
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
    "concreteType": "EnableMqttClientAuthPayload",
    "kind": "LinkedField",
    "name": "enableMqttClientAuth",
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
    "name": "MqttAuthClientsBarEnableAuthMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthClientsBarEnableAuthMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "18c98a8ece12eaa8c74c64bc23286b10",
    "id": null,
    "metadata": {},
    "name": "MqttAuthClientsBarEnableAuthMutation",
    "operationKind": "mutation",
    "text": "mutation MqttAuthClientsBarEnableAuthMutation(\n  $input: EnableMqttClientAuthInput!\n) {\n  enableMqttClientAuth(input: $input) {\n    gQL_MqttAuthCfg {\n      id\n      clientAuthEnabled\n      userAuthEnabled\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6b0ef1eb88823c15a41bea17e20bb66d";

export default node;
