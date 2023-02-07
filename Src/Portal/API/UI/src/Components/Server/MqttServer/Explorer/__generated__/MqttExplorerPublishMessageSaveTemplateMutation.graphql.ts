/**
 * @generated SignedSource<<fead644ad992d4477ba9a3746bcdbe6b>>
 * @relayHash 83db906edaa811df17846326eb67eb6b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 83db906edaa811df17846326eb67eb6b

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageContentType = "JSON" | "TEXT" | "UNDEFINED" | "%future added value";
export type MessageQoS = "AT_LEAST_ONCE" | "AT_MOST_ONCE" | "EXACTLY_ONCE" | "%future added value";
export type SaveMqttExplorerMessageTemplateInput = {
  contentType: MessageContentType;
  expireInterval: number;
  name: string;
  payload: string;
  qos: MessageQoS;
  retain: boolean;
  server_uid: string;
  topic: string;
};
export type MqttExplorerPublishMessageSaveTemplateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: SaveMqttExplorerMessageTemplateInput;
};
export type MqttExplorerPublishMessageSaveTemplateMutation$data = {
  readonly saveMqttExplorerMessageTemplate: {
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
      readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerPublishMessageStoredTemplateItemDataFragment">;
    } | null;
  };
};
export type MqttExplorerPublishMessageSaveTemplateMutation = {
  response: MqttExplorerPublishMessageSaveTemplateMutation$data;
  variables: MqttExplorerPublishMessageSaveTemplateMutation$variables;
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
    "name": "MqttExplorerPublishMessageSaveTemplateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SaveMqttExplorerMessageTemplatePayload",
        "kind": "LinkedField",
        "name": "saveMqttExplorerMessageTemplate",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "MqttExplorerPublishMessageStoredTemplateItemDataFragment"
              }
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
    "name": "MqttExplorerPublishMessageSaveTemplateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "SaveMqttExplorerMessageTemplatePayload",
        "kind": "LinkedField",
        "name": "saveMqttExplorerMessageTemplate",
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
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "payload",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qoS",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "retain",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "topic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contentType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expireInterval",
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
            "name": "gQL_MqttMessageTemplate",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_MqttMessageTemplate"
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
    "id": "83db906edaa811df17846326eb67eb6b",
    "metadata": {},
    "name": "MqttExplorerPublishMessageSaveTemplateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "cb964044b9f7f070d6022ee09093b469";

export default node;
