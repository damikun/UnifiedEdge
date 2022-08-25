/**
 * @generated SignedSource<<4bd73c003d1e68c11ccf420c2708e5df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeMetricsMemorySubscription$variables = {};
export type EdgeMetricsMemorySubscription$data = {
  readonly runtimeMetric: {
    readonly " $fragmentSpreads": FragmentRefs<"EdgeMetricsData">;
  };
};
export type EdgeMetricsMemorySubscription = {
  response: EdgeMetricsMemorySubscription$data;
  variables: EdgeMetricsMemorySubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "source",
    "value": "PRIVATE_MEMORY"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EdgeMetricsMemorySubscription",
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
        "storageKey": "runtimeMetric(source:\"PRIVATE_MEMORY\")"
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeMetricsMemorySubscription",
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
        "storageKey": "runtimeMetric(source:\"PRIVATE_MEMORY\")"
      }
    ]
  },
  "params": {
    "cacheID": "acb70999ddc6eebf916309b73e9f52f7",
    "id": null,
    "metadata": {},
    "name": "EdgeMetricsMemorySubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeMetricsMemorySubscription {\n  runtimeMetric(source: PRIVATE_MEMORY) {\n    ...EdgeMetricsData\n    id\n  }\n}\n\nfragment EdgeMetricsData on GQL_Metric {\n  timeStamp\n  id\n  name\n  value\n}\n"
  }
};
})();

(node as any).hash = "4d6154294dab65f0677dc5739b6334d4";

export default node;
