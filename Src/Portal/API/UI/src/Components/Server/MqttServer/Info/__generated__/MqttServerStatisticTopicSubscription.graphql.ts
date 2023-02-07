/**
 * @generated SignedSource<<d9bc1eecd596fbaf1c45e5539df53588>>
 * @relayHash 15b09ccfaa745a641d47e2cb02b77322
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 15b09ccfaa745a641d47e2cb02b77322

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerStatisticTopicSubscription$variables = {
  id: string;
};
export type MqttServerStatisticTopicSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: string;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerStatisticTopicSubscription = {
  response: MqttServerStatisticTopicSubscription$data;
  variables: MqttServerStatisticTopicSubscription$variables;
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
        "value": "TOPICS"
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
    "name": "MqttServerStatisticTopicSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerStatisticTopicSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "15b09ccfaa745a641d47e2cb02b77322",
    "metadata": {},
    "name": "MqttServerStatisticTopicSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "18c7a0a2c46bc576db4714aa2739e621";

export default node;
