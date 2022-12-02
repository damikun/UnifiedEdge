/**
 * @generated SignedSource<<77eb544705d954069068f6cf3728a2fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateMqttAuthClientInput = {
  clientId: string;
  server_uid: string;
};
export type CreateMqttAuthClientMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateMqttAuthClientInput;
};
export type CreateMqttAuthClientMutation$data = {
  readonly createMqttAuthClient: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttAuthClient: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientItemDataFragment">;
    } | null;
  };
};
export type CreateMqttAuthClientMutation = {
  response: CreateMqttAuthClientMutation$data;
  variables: CreateMqttAuthClientMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = {
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
            (v3/*: any*/)
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
        (v3/*: any*/)
      ],
      "type": "ResultError",
      "abstractKey": "__isResultError"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateMqttAuthClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateMqttAuthClientPayload",
        "kind": "LinkedField",
        "name": "createMqttAuthClient",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "MqttAuthClientItemDataFragment"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateMqttAuthClientMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateMqttAuthClientPayload",
        "kind": "LinkedField",
        "name": "createMqttAuthClient",
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
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "gQL_MqttAuthClient",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_MqttAuthClient"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3bb87b2552cc0aa7cbdc507adf3c84a6",
    "id": null,
    "metadata": {},
    "name": "CreateMqttAuthClientMutation",
    "operationKind": "mutation",
    "text": "mutation CreateMqttAuthClientMutation(\n  $input: CreateMqttAuthClientInput!\n) {\n  createMqttAuthClient(input: $input) {\n    gQL_MqttAuthClient {\n      ...MqttAuthClientItemDataFragment\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n\nfragment MqttAuthClientItemDataFragment on GQL_MqttAuthClient {\n  clientId\n  enabled\n  id\n}\n"
  }
};
})();

(node as any).hash = "3ce4515b38fb769d07736b827c8e83c6";

export default node;
