/**
 * @generated SignedSource<<945db0088f7f78eba20270772d2c6810>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerRecurringJobsDataFragment$data = {
  readonly __id: string;
  readonly recurringJobs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SchedulerRecurringJobItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "SchedulerRecurringJobsDataFragment";
};
export type SchedulerRecurringJobsDataFragment$key = {
  readonly " $data"?: SchedulerRecurringJobsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerRecurringJobsDataFragment">;
};

import SchedulerRecurringJobsPaginationFragmentRefetchQuery_graphql from './SchedulerRecurringJobsPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "recurringJobs"
],
v1 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": SchedulerRecurringJobsPaginationFragmentRefetchQuery_graphql
    }
  },
  "name": "SchedulerRecurringJobsDataFragment",
  "selections": [
    {
      "alias": "recurringJobs",
      "args": null,
      "concreteType": "GQL_RecurringJobConnection",
      "kind": "LinkedField",
      "name": "__SchedulerRecurringJobsPaginationFragmentConnection_recurringJobs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_RecurringJobEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_RecurringJob",
              "kind": "LinkedField",
              "name": "node",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SchedulerRecurringJobItemDataFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "7dd9423abe90bf4c55e219dfaec837e0";

export default node;
