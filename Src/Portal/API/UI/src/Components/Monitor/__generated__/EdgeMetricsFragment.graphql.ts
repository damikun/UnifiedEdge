/**
 * @generated SignedSource<<cc7e22f3c9238082235d4ca711d3e390>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeMetricsFragment$data = {
  readonly Cpu: {
    readonly " $fragmentSpreads": FragmentRefs<"MetricTrendHistoryFragment">;
  };
  readonly Memory: {
    readonly " $fragmentSpreads": FragmentRefs<"MetricTrendHistoryFragment">;
  };
  readonly Threads: {
    readonly " $fragmentSpreads": FragmentRefs<"MetricTrendHistoryFragment">;
  };
  readonly " $fragmentType": "EdgeMetricsFragment";
};
export type EdgeMetricsFragment$key = {
  readonly " $data"?: EdgeMetricsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeMetricsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeMetricsFragment",
  "selections": [
    {
      "alias": "Memory",
      "args": null,
      "concreteType": "GQL_RuntimeMetrics",
      "kind": "LinkedField",
      "name": "runtimeMetrics",
      "plural": false,
      "selections": [
        {
          "kind": "Defer",
          "selections": [
            {
              "args": [
                {
                  "kind": "Literal",
                  "name": "type",
                  "value": "PAGED_MEMORY"
                }
              ],
              "kind": "FragmentSpread",
              "name": "MetricTrendHistoryFragment"
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "alias": "Threads",
      "args": null,
      "concreteType": "GQL_RuntimeMetrics",
      "kind": "LinkedField",
      "name": "runtimeMetrics",
      "plural": false,
      "selections": [
        {
          "kind": "Defer",
          "selections": [
            {
              "args": [
                {
                  "kind": "Literal",
                  "name": "type",
                  "value": "THREAD_COUNT"
                }
              ],
              "kind": "FragmentSpread",
              "name": "MetricTrendHistoryFragment"
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "alias": "Cpu",
      "args": null,
      "concreteType": "GQL_RuntimeMetrics",
      "kind": "LinkedField",
      "name": "runtimeMetrics",
      "plural": false,
      "selections": [
        {
          "kind": "Defer",
          "selections": [
            {
              "args": [
                {
                  "kind": "Literal",
                  "name": "type",
                  "value": "TOTAL_CPU_USED"
                }
              ],
              "kind": "FragmentSpread",
              "name": "MetricTrendHistoryFragment"
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "c741dab4a24ef258c0f84d936380f3b4";

export default node;
