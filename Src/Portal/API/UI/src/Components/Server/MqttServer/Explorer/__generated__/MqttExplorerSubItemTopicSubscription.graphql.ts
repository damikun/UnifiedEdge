/**
 * @generated SignedSource<<49e788ede61acc22962201d776ec448c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttExplorerSubItemTopicSubscription$variables = {
  id: string;
  topic: string;
};
export type MqttExplorerSubItemTopicSubscription$data = {
  readonly mqttBridgeSubscribe: {
    readonly contentType: string | null;
    readonly id: string;
    readonly isJsonPayload: boolean;
    readonly isTextPayload: boolean;
    readonly isXmlPayload: boolean;
    readonly payload: ReadonlyArray<any> | null;
    readonly payloadUtf8Str: string | null;
    readonly timeStamp: string;
    readonly topic: string;
  };
};
export type MqttExplorerSubItemTopicSubscription = {
  response: MqttExplorerSubItemTopicSubscription$data;
  variables: MqttExplorerSubItemTopicSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topic"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "server_id",
        "variableName": "id"
      },
      {
        "kind": "Variable",
        "name": "topic",
        "variableName": "topic"
      }
    ],
    "concreteType": "GQL_MqttMessage",
    "kind": "LinkedField",
    "name": "mqttBridgeSubscribe",
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
        "name": "contentType",
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
        "name": "isXmlPayload",
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
        "name": "timeStamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "payloadUtf8Str",
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
    "name": "MqttExplorerSubItemTopicSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttExplorerSubItemTopicSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5e1d738d056e039d06dadaf02d084688",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerSubItemTopicSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttExplorerSubItemTopicSubscription(\n  $id: ID!\n  $topic: String!\n) {\n  mqttBridgeSubscribe(server_id: $id, topic: $topic) {\n    id\n    contentType\n    topic\n    isJsonPayload\n    isTextPayload\n    isXmlPayload\n    payload\n    timeStamp\n    payloadUtf8Str\n  }\n}\n"
  }
};
})();

(node as any).hash = "80a2b22ef44cc87932d4858f7d5b6ba9";

export default node;
