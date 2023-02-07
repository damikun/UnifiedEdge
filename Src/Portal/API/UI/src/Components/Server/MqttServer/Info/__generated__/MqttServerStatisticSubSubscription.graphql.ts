/**
 * @generated SignedSource<<58aac264bb1511ccb34d533013d2915f>>
 * @relayHash dac37c5618217324bdf30aad95353680
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID dac37c5618217324bdf30aad95353680

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerStatisticSubSubscription$variables = {
  id: string;
};
export type MqttServerStatisticSubSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: string;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerStatisticSubSubscription = {
  response: MqttServerStatisticSubSubscription$data;
  variables: MqttServerStatisticSubSubscription$variables;
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
        "value": "TOPIC_SUBSCRIPTIONS"
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
    "name": "MqttServerStatisticSubSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerStatisticSubSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "dac37c5618217324bdf30aad95353680",
    "metadata": {},
    "name": "MqttServerStatisticSubSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "4ff574c968fc203784af2b090583ed1a";

export default node;
