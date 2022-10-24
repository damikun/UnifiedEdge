/**
 * @generated SignedSource<<15dcbd13c96e097008510c9e8d2fbcbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttServerStatisticTopicSubSubscription$variables = {
  id: string;
};
export type MqttServerStatisticTopicSubSubscription$data = {
  readonly mqttServerMetrics: {
    readonly id: string;
    readonly timeStamp: any;
    readonly unit: string | null;
    readonly value: any | null;
  };
};
export type MqttServerStatisticTopicSubSubscription = {
  response: MqttServerStatisticTopicSubSubscription$data;
  variables: MqttServerStatisticTopicSubSubscription$variables;
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
    "name": "MqttServerStatisticTopicSubSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerStatisticTopicSubSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "609615b622f3f7057bbe692c580840c9",
    "id": null,
    "metadata": {},
    "name": "MqttServerStatisticTopicSubSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttServerStatisticTopicSubSubscription(\n  $id: ID!\n) {\n  mqttServerMetrics(server_id: $id, metric: TOPIC_SUBSCRIPTIONS) {\n    id\n    timeStamp\n    unit\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "49fb2b76a1848ebd091c6e3258a4c3a5";

export default node;
