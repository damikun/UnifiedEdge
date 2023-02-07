/**
 * @generated SignedSource<<29a7aa8b9a0f3c71bd9114aa960d0898>>
 * @relayHash 58578159cd31931f674ac01fe31e6507
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 58578159cd31931f674ac01fe31e6507

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttClientDetailSubscription$variables = {
  client_id: string;
  server_id: string;
};
export type MqttClientDetailSubscription$data = {
  readonly mqttServerClientStatistics: {
    readonly clientId: string;
    readonly serverId: string;
    readonly stats: {
      readonly bytesReceived: any;
      readonly bytesSent: any;
      readonly id: string;
      readonly lastNonKeepAlivePacketReceivedTimestamp: string | null;
      readonly lastPacketReceivedTimestamp: string | null;
      readonly lastPacketSentTimestamp: string | null;
      readonly receivedApplicationMessagesCount: any;
      readonly receivedPacketsCount: any;
      readonly sentApplicationMessagesCount: any;
      readonly sentPacketsCount: any;
    };
  };
};
export type MqttClientDetailSubscription = {
  response: MqttClientDetailSubscription$data;
  variables: MqttClientDetailSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "client_id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "server_id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "client_id",
        "variableName": "client_id"
      },
      {
        "kind": "Variable",
        "name": "server_id",
        "variableName": "server_id"
      }
    ],
    "concreteType": "GQL_MqttClientStatsUpdate",
    "kind": "LinkedField",
    "name": "mqttServerClientStatistics",
    "plural": false,
    "selections": [
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
        "name": "serverId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttClientStatistics",
        "kind": "LinkedField",
        "name": "stats",
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
            "name": "bytesReceived",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bytesSent",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sentPacketsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "receivedPacketsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sentApplicationMessagesCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "receivedApplicationMessagesCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastNonKeepAlivePacketReceivedTimestamp",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastPacketReceivedTimestamp",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastPacketSentTimestamp",
            "storageKey": null
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttClientDetailSubscription",
    "selections": (v2/*: any*/),
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
    "name": "MqttClientDetailSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "58578159cd31931f674ac01fe31e6507",
    "metadata": {},
    "name": "MqttClientDetailSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "eb65d7bd5cf9031d54a37ecfdd95757d";

export default node;
