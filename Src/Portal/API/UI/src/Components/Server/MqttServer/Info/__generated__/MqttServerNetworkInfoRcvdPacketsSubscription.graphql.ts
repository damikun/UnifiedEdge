/**
 * @generated SignedSource<<21ee5b66b8ad3159d2ddc5355fafad57>>
 * @relayHash 1df3582e758b92650f57251d7d1853d6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1df3582e758b92650f57251d7d1853d6

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
    "id": "1df3582e758b92650f57251d7d1853d6",
    "metadata": {},
    "name": "MqttServerNetworkInfoRcvdPacketsSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "0413bf38206d229c2ab7c9ebd42e74fd";

export default node;
