/**
 * @generated SignedSource<<ed9a75218c102d6ddd1df6a16c498809>>
 * @relayHash bb7078e5d617c7d4ca8322132446498d
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bb7078e5d617c7d4ca8322132446498d

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttAuthUserInput = {
  authUser_id: string;
  enable: boolean;
};
export type MqttAuthUserItemEnableMutation$variables = {
  input: EnableMqttAuthUserInput;
};
export type MqttAuthUserItemEnableMutation$data = {
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
export type MqttAuthUserItemEnableMutation = {
  response: MqttAuthUserItemEnableMutation$data;
  variables: MqttAuthUserItemEnableMutation$variables;
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
    "name": "MqttAuthUserItemEnableMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUserItemEnableMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "bb7078e5d617c7d4ca8322132446498d",
    "metadata": {},
    "name": "MqttAuthUserItemEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5744262e2d54eeb7d3ad6902e72530e3";

export default node;
