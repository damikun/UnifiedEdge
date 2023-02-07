/**
 * @generated SignedSource<<c170464fd0ae002b3edae36628b4c19b>>
 * @relayHash bce35704b45feada5c46c33aa47e2685
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bce35704b45feada5c46c33aa47e2685

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicsNewInboundSubscription$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type MqttTopicsNewInboundSubscription$data = {
  readonly mqttNewTopic: {
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
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    "name": "MqttTopicsNewInboundSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttNewTopic",
        "kind": "LinkedField",
        "name": "mqttNewTopic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttTopic",
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
        "concreteType": "GQL_MqttNewTopic",
        "kind": "LinkedField",
        "name": "mqttNewTopic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttTopic",
            "kind": "LinkedField",
            "name": "topic",
            "plural": false,
            "selections": [
              (v3/*: any*/),
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
                  (v3/*: any*/),
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
                "value": "GQL_MqttTopic"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "bce35704b45feada5c46c33aa47e2685",
    "metadata": {},
    "name": "MqttTopicsNewInboundSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "e52183563f7240a4bb63f1c763815dfc";

export default node;
