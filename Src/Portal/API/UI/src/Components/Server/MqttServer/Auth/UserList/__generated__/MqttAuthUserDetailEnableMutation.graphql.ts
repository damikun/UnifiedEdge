/**
 * @generated SignedSource<<f78c12348223590f8416f9c0c0e44c23>>
 * @relayHash 3db7f1ca3b7bb242cd71669729847541
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3db7f1ca3b7bb242cd71669729847541

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttAuthUserInput = {
  authUser_id: string;
  enable: boolean;
};
export type MqttAuthUserDetailEnableMutation$variables = {
  input: EnableMqttAuthUserInput;
};
export type MqttAuthUserDetailEnableMutation$data = {
  readonly enableMqttAuthUser: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttAuthUser: {
      readonly enabled: boolean;
      readonly id: string;
      readonly userName: string | null;
    } | null;
  };
};
export type MqttAuthUserDetailEnableMutation = {
  response: MqttAuthUserDetailEnableMutation$data;
  variables: MqttAuthUserDetailEnableMutation$variables;
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
    "concreteType": "EnableMqttAuthUserPayload",
    "kind": "LinkedField",
    "name": "enableMqttAuthUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttAuthUser",
        "kind": "LinkedField",
        "name": "gQL_MqttAuthUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userName",
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
    "name": "MqttAuthUserDetailEnableMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUserDetailEnableMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "3db7f1ca3b7bb242cd71669729847541",
    "metadata": {},
    "name": "MqttAuthUserDetailEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "860ad2cf7726954e29f112f3bb207ce7";

export default node;
