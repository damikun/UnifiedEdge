/**
 * @generated SignedSource<<0b4ed4dddd6f2a809299084598d05e70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeMetricsThreadsSubscription$variables = {};
export type EdgeMetricsThreadsSubscription$data = {
  readonly runtimeMetric: {
    readonly " $fragmentSpreads": FragmentRefs<"EdgeMetricsData">;
  };
};
export type EdgeMetricsThreadsSubscription = {
  response: EdgeMetricsThreadsSubscription$data;
  variables: EdgeMetricsThreadsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "source",
    "value": "THREAD_COUNT"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EdgeMetricsThreadsSubscription",
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
        "storageKey": "runtimeMetric(source:\"THREAD_COUNT\")"
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeMetricsThreadsSubscription",
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
        "storageKey": "runtimeMetric(source:\"THREAD_COUNT\")"
      }
    ]
  },
  "params": {
    "cacheID": "d4f02078ada5aa1293d949b071fc14c3",
    "id": null,
    "metadata": {},
    "name": "EdgeMetricsThreadsSubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeMetricsThreadsSubscription {\n  runtimeMetric(source: THREAD_COUNT) {\n    ...EdgeMetricsData\n    id\n  }\n}\n\nfragment EdgeMetricsData on GQL_Metric {\n  timeStamp\n  id\n  name\n  value\n}\n"
  }
};
})();

(node as any).hash = "ef2f8c179e35c8c6684a5f8c8fe88faf";

export default node;
