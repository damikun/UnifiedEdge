/**
 * @generated SignedSource<<a6cbb00aea095a017ec98936d9c30798>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicsUpdatedSubscription$variables = {
  id: string;
};
export type MqttTopicsUpdatedSubscription$data = {
  readonly mqttTopicUpdated: {
    readonly " $fragmentSpreads": FragmentRefs<"MqttTopicItemDataFragment">;
  };
};
export type MqttTopicsUpdatedSubscription = {
  response: MqttTopicsUpdatedSubscription$data;
  variables: MqttTopicsUpdatedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttTopicsUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttTopic",
        "kind": "LinkedField",
        "name": "mqttTopicUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MqttTopicItemDataFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttTopicsUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttTopic",
        "kind": "LinkedField",
        "name": "mqttTopicUpdated",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "serverUid",
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
            "concreteType": "GQL_MqttTopicStats",
            "kind": "LinkedField",
            "name": "stats",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "messagesCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b46c84d4b9a200f33c5d075bb28b015a",
    "id": null,
    "metadata": {},
    "name": "MqttTopicsUpdatedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttTopicsUpdatedSubscription(\n  $id: ID!\n) {\n  mqttTopicUpdated(server_id: $id) {\n    ...MqttTopicItemDataFragment\n    id\n  }\n}\n\nfragment MqttTopicItemDataFragment on GQL_MqttTopic {\n  id\n  serverUid\n  topic\n  stats {\n    id\n    messagesCount\n  }\n}\n"
  }
};
})();

(node as any).hash = "d88aa7a52d980ace0f648f7644ed330e";

export default node;
