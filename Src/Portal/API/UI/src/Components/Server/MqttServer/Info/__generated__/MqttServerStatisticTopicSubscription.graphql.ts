/**
 * @generated SignedSource<<c7437149b73ee5c520946eafefb06718>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "15b09ccfaa745a641d47e2cb02b77322",
    "id": null,
    "metadata": {},
    "name": "MqttServerStatisticTopicSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttServerStatisticTopicSubscription(\n  $id: ID!\n) {\n  mqttServerMetrics(server_id: $id, metric: TOPICS) {\n    id\n    timeStamp\n    unit\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "18c7a0a2c46bc576db4714aa2739e621";

export default node;
