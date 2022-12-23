/**
 * @generated SignedSource<<9df5aa338114053a7dcfb88937d2fe27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveMqttServerExplorerUserSubInput = {
  storedsub_id: string;
};
export type MqttExplorerSubItemRemoveMutation$variables = {
  connections: ReadonlyArray<string>;
  input: RemoveMqttServerExplorerUserSubInput;
};
export type MqttExplorerSubItemRemoveMutation$data = {
  readonly removeMqttServerExplorerUserSub: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttExplorerSub: {
      readonly id: string;
    } | null;
  };
};
export type MqttExplorerSubItemRemoveMutation = {
  response: MqttExplorerSubItemRemoveMutation$data;
  variables: MqttExplorerSubItemRemoveMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
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
            (v4/*: any*/)
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
        (v4/*: any*/)
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
    "name": "MqttExplorerSubItemRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveMqttServerExplorerUserSubPayload",
        "kind": "LinkedField",
        "name": "removeMqttServerExplorerUserSub",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttExplorerSub",
            "kind": "LinkedField",
            "name": "gQL_MqttExplorerSub",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
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
    "name": "MqttExplorerSubItemRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveMqttServerExplorerUserSubPayload",
        "kind": "LinkedField",
        "name": "removeMqttServerExplorerUserSub",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttExplorerSub",
            "kind": "LinkedField",
            "name": "gQL_MqttExplorerSub",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "118c3140ed9ac489a05ac185eb3d5d3b",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerSubItemRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation MqttExplorerSubItemRemoveMutation(\n  $input: RemoveMqttServerExplorerUserSubInput!\n) {\n  removeMqttServerExplorerUserSub(input: $input) {\n    gQL_MqttExplorerSub {\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "327daef2242e2940cee18422e3e4d254";

export default node;
