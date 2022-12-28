/**
 * @generated SignedSource<<13c8f740777a570925a51f5e099788f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type GQL_RuntimeMetricSource = "GC_ALOCATED_MEMORY" | "MEMORY_WORKING_SET" | "NON_PAGED_SYSTEM_MEMORY" | "PAGED_MEMORY" | "PAGED_SYSTEM_MEMORY" | "PRIVATE_MEMORY" | "PRIVILEGED_CPU_USED" | "THREAD_COUNT" | "TOTAL_CPU_USED" | "USER_CPU_USED" | "VIRTUAL_MEMORY" | "%future added value";
export type MetricTrendSubscription$variables = {
  props: GQL_RuntimeMetricSource;
};
export type MetricTrendSubscription$data = {
  readonly runtimeMetric: {
    readonly id: string;
    readonly name: string;
    readonly timeStamp: string;
    readonly value: any | null;
  };
};
export type MetricTrendSubscription = {
  response: MetricTrendSubscription$data;
  variables: MetricTrendSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "props"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "source",
        "variableName": "props"
      }
    ],
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MetricTrendSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MetricTrendSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d7fbb0c17c53f8db814a0e26e4e7e5de",
    "id": null,
    "metadata": {},
    "name": "MetricTrendSubscription",
    "operationKind": "subscription",
    "text": "subscription MetricTrendSubscription(\n  $props: GQL_RuntimeMetricSource!\n) {\n  runtimeMetric(source: $props) {\n    timeStamp\n    id\n    name\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "648a77881de1eddf93ad220b53a02ae6";

export default node;
