/**
 * @generated SignedSource<<e9a1ffa4db3fbde46e4c5abf7c8ac1d8>>
 * @relayHash bbd7f711f34bacbf68a6336c7900488e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bbd7f711f34bacbf68a6336c7900488e

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttAuthClinetInput = {
  authClient_id: string;
  enable: boolean;
};
export type MqttAuthClientDetailEnableMutation$variables = {
  input: EnableMqttAuthClinetInput;
};
export type MqttAuthClientDetailEnableMutation$data = {
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
export type MqttAuthClientDetailEnableMutation = {
  response: MqttAuthClientDetailEnableMutation$data;
  variables: MqttAuthClientDetailEnableMutation$variables;
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
    "name": "MqttAuthClientDetailEnableMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthClientDetailEnableMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "bbd7f711f34bacbf68a6336c7900488e",
    "metadata": {},
    "name": "MqttAuthClientDetailEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ffd74de2c2527cc92888ab9ba971443e";

export default node;
