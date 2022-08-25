/**
 * @generated SignedSource<<82a137fc04e0ebafee8a9d159deb7966>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeMetricsCpuSubscription$variables = {};
export type EdgeMetricsCpuSubscription$data = {
  readonly runtimeMetric: {
    readonly " $fragmentSpreads": FragmentRefs<"EdgeMetricsData">;
  };
};
export type EdgeMetricsCpuSubscription = {
  response: EdgeMetricsCpuSubscription$data;
  variables: EdgeMetricsCpuSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "source",
    "value": "TOTAL_CPU_USED"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EdgeMetricsCpuSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "GQL_Metric",
        "kind": "LinkedField",
        "name": "runtimeMetric",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EdgeMetricsData"
          }
        ],
        "storageKey": "runtimeMetric(source:\"TOTAL_CPU_USED\")"
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeMetricsCpuSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "GQL_Metric",
        "kind": "LinkedField",
        "name": "runtimeMetric",
        "plural": false,
        "selections": [
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
        "storageKey": "runtimeMetric(source:\"TOTAL_CPU_USED\")"
      }
    ]
  },
  "params": {
    "cacheID": "731cf8d08fc1cf56edfb5a2d39cd05fb",
    "id": null,
    "metadata": {},
    "name": "EdgeMetricsCpuSubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeMetricsCpuSubscription {\n  runtimeMetric(source: TOTAL_CPU_USED) {\n    ...EdgeMetricsData\n    id\n  }\n}\n\nfragment EdgeMetricsData on GQL_Metric {\n  timeStamp\n  id\n  name\n  value\n}\n"
  }
};
})();

(node as any).hash = "01f2280da137d56ece87e04a56e37aac";

export default node;
