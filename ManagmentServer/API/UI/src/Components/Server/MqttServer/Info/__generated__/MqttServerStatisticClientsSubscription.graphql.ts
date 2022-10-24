/**
 * @generated SignedSource<<c2ef276f81d6c5e766abba142e33df80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerStatisticClientsSubscription$variables = {
  id: string;
};
export type MqttServerStatisticClientsSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: any;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerStatisticClientsSubscription = {
  response: MqttServerStatisticClientsSubscription$data;
  variables: MqttServerStatisticClientsSubscription$variables;
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
        "value": "CONNECTED_CLIENTS"
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
    "name": "MqttServerStatisticClientsSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerStatisticClientsSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5e6de9d86896ac1a28f949c1107dcc3c",
    "id": null,
    "metadata": {},
    "name": "MqttServerStatisticClientsSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttServerStatisticClientsSubscription(\n  $id: ID!\n) {\n  mqttServerMetrics(server_id: $id, metric: CONNECTED_CLIENTS) {\n    id\n    timeStamp\n    unit\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "ded21c270b83ea5fd6fe4975d43351ff";

export default node;
