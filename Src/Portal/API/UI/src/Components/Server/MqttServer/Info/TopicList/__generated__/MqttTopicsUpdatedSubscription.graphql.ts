/**
 * @generated SignedSource<<00bdad811d2f45da4bdc06ba5179ecbc>>
 * @relayHash b46c84d4b9a200f33c5d075bb28b015a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b46c84d4b9a200f33c5d075bb28b015a

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
    "id": "b46c84d4b9a200f33c5d075bb28b015a",
    "metadata": {},
    "name": "MqttTopicsUpdatedSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "d88aa7a52d980ace0f648f7644ed330e";

export default node;
