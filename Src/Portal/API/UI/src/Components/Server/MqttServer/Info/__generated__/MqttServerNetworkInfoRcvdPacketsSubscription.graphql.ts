/**
 * @generated SignedSource<<dc0102f4a9cac0b577051d9ac186aedc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerNetworkInfoRcvdPacketsSubscription$variables = {
  id: string;
};
export type MqttServerNetworkInfoRcvdPacketsSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: string;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerNetworkInfoRcvdPacketsSubscription = {
  response: MqttServerNetworkInfoRcvdPacketsSubscription$data;
  variables: MqttServerNetworkInfoRcvdPacketsSubscription$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "metric",
        "value": "INBOUND_PACKETS"
      },
      {
        "kind": "Variable",
        "name": "server_id",
        "variableName": "id"
      }
    ],
    "concreteType": "GQL_ServerMetric",
    "kind": "LinkedField",
    "name": "mqttServerMetrics",
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
        "name": "timeStamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "unit",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
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
    "name": "MqttServerNetworkInfoRcvdPacketsSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerNetworkInfoRcvdPacketsSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1df3582e758b92650f57251d7d1853d6",
    "id": null,
    "metadata": {},
    "name": "MqttServerNetworkInfoRcvdPacketsSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttServerNetworkInfoRcvdPacketsSubscription(\n  $id: ID!\n) {\n  mqttServerMetrics(server_id: $id, metric: INBOUND_PACKETS) {\n    id\n    timeStamp\n    unit\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "0413bf38206d229c2ab7c9ebd42e74fd";

export default node;
