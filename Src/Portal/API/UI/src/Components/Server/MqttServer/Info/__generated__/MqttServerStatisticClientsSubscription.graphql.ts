/**
 * @generated SignedSource<<727401e7c9c39f14e659ba5a58c93ef8>>
 * @relayHash 5e6de9d86896ac1a28f949c1107dcc3c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5e6de9d86896ac1a28f949c1107dcc3c

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerStatisticClientsSubscription$variables = {
  id: string;
};
export type MqttServerStatisticClientsSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: string;
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
    "id": "5e6de9d86896ac1a28f949c1107dcc3c",
    "metadata": {},
    "name": "MqttServerStatisticClientsSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "ded21c270b83ea5fd6fe4975d43351ff";

export default node;
