/**
 * @generated SignedSource<<dc7ed5a97e51cb08d39892e4917aace0>>
 * @relayHash f3078117504d93e436ca4c38753a5a42
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f3078117504d93e436ca4c38753a5a42

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveMqttServerExplorerUserTemplateInput = {
  template_id: string;
};
export type MqttExplorerPublishMessageTemplateRemoveMutation$variables = {
  connections: ReadonlyArray<string>;
  input: RemoveMqttServerExplorerUserTemplateInput;
};
export type MqttExplorerPublishMessageTemplateRemoveMutation$data = {
  readonly removeMqttServerExplorerUserTemplate: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttMessageTemplate: {
      readonly id: string;
    } | null;
  };
};
export type MqttExplorerPublishMessageTemplateRemoveMutation = {
  response: MqttExplorerPublishMessageTemplateRemoveMutation$data;
  variables: MqttExplorerPublishMessageTemplateRemoveMutation$variables;
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
    "name": "MqttExplorerPublishMessageTemplateRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveMqttServerExplorerUserTemplatePayload",
        "kind": "LinkedField",
        "name": "removeMqttServerExplorerUserTemplate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttMessageTemplate",
            "kind": "LinkedField",
            "name": "gQL_MqttMessageTemplate",
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
    "name": "MqttExplorerPublishMessageTemplateRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveMqttServerExplorerUserTemplatePayload",
        "kind": "LinkedField",
        "name": "removeMqttServerExplorerUserTemplate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttMessageTemplate",
            "kind": "LinkedField",
            "name": "gQL_MqttMessageTemplate",
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
    "id": "f3078117504d93e436ca4c38753a5a42",
    "metadata": {},
    "name": "MqttExplorerPublishMessageTemplateRemoveMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8b59869a8066d4b18bd14db24dd6cce1";

export default node;
