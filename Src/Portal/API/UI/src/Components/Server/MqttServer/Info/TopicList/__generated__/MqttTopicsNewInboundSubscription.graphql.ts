/**
 * @generated SignedSource<<df75f347e99d4dbb20571415d837c193>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicsNewInboundSubscription$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type MqttTopicsNewInboundSubscription$data = {
  readonly mqttNewInboundTopic: {
    readonly topic: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttTopicItemDataFragment">;
    };
  };
};
export type MqttTopicsNewInboundSubscription = {
  response: MqttTopicsNewInboundSubscription$data;
  variables: MqttTopicsNewInboundSubscription$variables;
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
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttTopicsNewInboundSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttNewInboundTopic",
        "kind": "LinkedField",
        "name": "mqttNewInboundTopic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttServerTopicStat",
            "kind": "LinkedField",
            "name": "topic",
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
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MqttTopicsNewInboundSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttNewInboundTopic",
        "kind": "LinkedField",
        "name": "mqttNewInboundTopic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttServerTopicStat",
            "kind": "LinkedField",
            "name": "topic",
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
                "name": "topic",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "count",
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
            "name": "topic",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_MqttServerTopicStat"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "45fda478a728329d8b8f3db5dc1357d2",
    "id": null,
    "metadata": {},
    "name": "MqttTopicsNewInboundSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttTopicsNewInboundSubscription(\n  $id: ID!\n) {\n  mqttNewInboundTopic(server_id: $id) {\n    topic {\n      ...MqttTopicItemDataFragment\n    }\n  }\n}\n\nfragment MqttTopicItemDataFragment on GQL_MqttServerTopicStat {\n  id\n  topic\n  count\n}\n"
  }
};
})();

(node as any).hash = "51b8fc472c5fd80bdb33c7e6a5a646ff";

export default node;
