/**
 * @generated SignedSource<<91164ef64af7dc2a0de2dd209154cb6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MessageContentType = "JSON" | "TEXT" | "UNDEFINED" | "%future added value";
export type MessageQoS = "AT_LEAST_ONCE" | "AT_MOST_ONCE" | "EXACTLY_ONCE" | "%future added value";
export type PublishMqttMessageInput = {
  contentType: MessageContentType;
  expireInterval: number;
  payload: ReadonlyArray<any>;
  qos: MessageQoS;
  retain: boolean;
  server_uid: string;
  topic: string;
};
export type MqttExplorerPublishMessageMutation$variables = {
  input: PublishMqttMessageInput;
};
export type MqttExplorerPublishMessageMutation$data = {
  readonly publishMqttMessage: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttMessage: {
      readonly clientId: string | null;
      readonly contentType: string | null;
      readonly id: string;
      readonly isJsonPayload: boolean;
      readonly isTextPayload: boolean;
      readonly payload: ReadonlyArray<any> | null;
      readonly payloadUtf8Str: string | null;
      readonly qos: any;
      readonly retain: boolean;
      readonly topic: string;
    } | null;
  };
};
export type MqttExplorerPublishMessageMutation = {
  response: MqttExplorerPublishMessageMutation$data;
  variables: MqttExplorerPublishMessageMutation$variables;
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
    "concreteType": "PublishMqttMessagePayload",
    "kind": "LinkedField",
    "name": "publishMqttMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttMessage",
        "kind": "LinkedField",
        "name": "gQL_MqttMessage",
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
            "name": "clientId",
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
            "name": "qos",
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
            "name": "payload",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "payloadUtf8Str",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isJsonPayload",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isTextPayload",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "contentType",
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
    "name": "MqttExplorerPublishMessageMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttExplorerPublishMessageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "69dc5be4638d455c13273337cd5d72ac",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerPublishMessageMutation",
    "operationKind": "mutation",
    "text": "mutation MqttExplorerPublishMessageMutation(\n  $input: PublishMqttMessageInput!\n) {\n  publishMqttMessage(input: $input) {\n    gQL_MqttMessage {\n      id\n      clientId\n      topic\n      qos\n      retain\n      payload\n      payloadUtf8Str\n      isJsonPayload\n      isTextPayload\n      contentType\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5bea0d0999f8c8267aeecb28de311be5";

export default node;
