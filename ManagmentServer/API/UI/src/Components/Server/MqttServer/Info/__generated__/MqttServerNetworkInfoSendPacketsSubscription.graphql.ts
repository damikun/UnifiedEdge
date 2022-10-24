/**
 * @generated SignedSource<<7d4ac0137a13a067d7569ae18fed95b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerNetworkInfoSendPacketsSubscription$variables = {
  id: string;
};
export type MqttServerNetworkInfoSendPacketsSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: any;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerNetworkInfoSendPacketsSubscription = {
  response: MqttServerNetworkInfoSendPacketsSubscription$data;
  variables: MqttServerNetworkInfoSendPacketsSubscription$variables;
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
        "value": "OUTBOUND_PACKETS"
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
    "name": "MqttServerNetworkInfoSendPacketsSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerNetworkInfoSendPacketsSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0c5c4ca14ec410c0e144d727b257e3c9",
    "id": null,
    "metadata": {},
    "name": "MqttServerNetworkInfoSendPacketsSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttServerNetworkInfoSendPacketsSubscription(\n  $id: ID!\n) {\n  mqttServerMetrics(server_id: $id, metric: OUTBOUND_PACKETS) {\n    id\n    timeStamp\n    unit\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "d67e82382d5988a47659e900f903ad85";

export default node;
