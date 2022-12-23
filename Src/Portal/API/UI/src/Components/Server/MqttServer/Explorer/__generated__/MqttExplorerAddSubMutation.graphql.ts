/**
 * @generated SignedSource<<8c9cb64da3f8cda928fafacad67e92f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateMqttServerExplorerUserSubInput = {
  color?: string | null;
  noLocal: boolean;
  server_uid: string;
  topic: string;
};
export type MqttExplorerAddSubMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateMqttServerExplorerUserSubInput;
};
export type MqttExplorerAddSubMutation$data = {
  readonly createMqttServerExplorerUserSub: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttExplorerSub: {
      readonly color: string | null;
      readonly id: string;
      readonly noLocal: boolean;
      readonly topic: string | null;
    } | null;
  };
};
export type MqttExplorerAddSubMutation = {
  response: MqttExplorerAddSubMutation$data;
  variables: MqttExplorerAddSubMutation$variables;
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
  "concreteType": "GQL_MqttExplorerSub",
  "kind": "LinkedField",
  "name": "gQL_MqttExplorerSub",
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
      "name": "color",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "noLocal",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
      "storageKey": null
    }
  ],
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
    "name": "MqttExplorerAddSubMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateMqttServerExplorerUserSubPayload",
        "kind": "LinkedField",
        "name": "createMqttServerExplorerUserSub",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
    "name": "MqttExplorerAddSubMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateMqttServerExplorerUserSubPayload",
        "kind": "LinkedField",
        "name": "createMqttServerExplorerUserSub",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "gQL_MqttExplorerSub",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_MqttExplorerSub"
              }
            ]
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "497f058b40580b02505a5271899153ad",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerAddSubMutation",
    "operationKind": "mutation",
    "text": "mutation MqttExplorerAddSubMutation(\n  $input: CreateMqttServerExplorerUserSubInput!\n) {\n  createMqttServerExplorerUserSub(input: $input) {\n    gQL_MqttExplorerSub {\n      id\n      color\n      noLocal\n      topic\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f4ab9813450f9a308711c68322bbbb9";

export default node;
