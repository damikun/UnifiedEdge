/**
 * @generated SignedSource<<0bd70cafa7f924a2bfab5332865ec98d>>
 * @relayHash 0c132ba2ca12b75a7e1734b5808e9a95
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0c132ba2ca12b75a7e1734b5808e9a95

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttAuthClinetInput = {
  authClient_id: string;
  enable: boolean;
};
export type MqttAuthClientItemEnableMutation$variables = {
  input: EnableMqttAuthClinetInput;
};
export type MqttAuthClientItemEnableMutation$data = {
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
export type MqttAuthClientItemEnableMutation = {
  response: MqttAuthClientItemEnableMutation$data;
  variables: MqttAuthClientItemEnableMutation$variables;
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
    "name": "MqttAuthClientItemEnableMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthClientItemEnableMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "0c132ba2ca12b75a7e1734b5808e9a95",
    "metadata": {},
    "name": "MqttAuthClientItemEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "eaea2ee1f49ab4359c0377f46d4a5318";

export default node;
