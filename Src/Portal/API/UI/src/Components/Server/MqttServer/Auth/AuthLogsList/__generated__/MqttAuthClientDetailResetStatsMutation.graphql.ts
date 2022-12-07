/**
 * @generated SignedSource<<39e921c18f56da5d08f14442fbe15f69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttAuthClinetInput = {
  authClient_id: string;
  enable: boolean;
};
export type MqttAuthClientDetailResetStatsMutation$variables = {
  input: EnableMqttAuthClinetInput;
};
export type MqttAuthClientDetailResetStatsMutation$data = {
  readonly enableMqttAuthClinet: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttAuthClient: {
      readonly clientId: string | null;
      readonly enabled: boolean;
      readonly id: string;
    } | null;
  };
};
export type MqttAuthClientDetailResetStatsMutation = {
  response: MqttAuthClientDetailResetStatsMutation$data;
  variables: MqttAuthClientDetailResetStatsMutation$variables;
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
    "concreteType": "EnableMqttAuthClinetPayload",
    "kind": "LinkedField",
    "name": "enableMqttAuthClinet",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttAuthClient",
        "kind": "LinkedField",
        "name": "gQL_MqttAuthClient",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clientId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "enabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "MqttAuthClientDetailResetStatsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthClientDetailResetStatsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "eaa1dd87604ae05ddf7a791e71b36aed",
    "id": null,
    "metadata": {},
    "name": "MqttAuthClientDetailResetStatsMutation",
    "operationKind": "mutation",
    "text": "mutation MqttAuthClientDetailResetStatsMutation(\n  $input: EnableMqttAuthClinetInput!\n) {\n  enableMqttAuthClinet(input: $input) {\n    gQL_MqttAuthClient {\n      clientId\n      enabled\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0694ef23c700f11e0b4a8bd46aeef0db";

export default node;
