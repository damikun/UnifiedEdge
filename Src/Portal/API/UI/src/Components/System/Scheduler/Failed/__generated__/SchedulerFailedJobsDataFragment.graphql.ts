/**
 * @generated SignedSource<<a518b36f220d240d265bbc6d7b2f94a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerFailedJobsDataFragment$data = {
  readonly __id: string;
  readonly failedJobs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SchedulerFailedJobItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "SchedulerFailedJobsDataFragment";
};
export type SchedulerFailedJobsDataFragment$key = {
  readonly " $data"?: SchedulerFailedJobsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerFailedJobsDataFragment">;
};

import SchedulerFailedJobsPaginationFragmentRefetchQuery_graphql from './SchedulerFailedJobsPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "failedJobs"
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
      "operation": SchedulerFailedJobsPaginationFragmentRefetchQuery_graphql
    }
  },
  "name": "SchedulerFailedJobsDataFragment",
  "selections": [
    {
      "alias": "failedJobs",
      "args": null,
      "concreteType": "GQL_FailedJobConnection",
      "kind": "LinkedField",
      "name": "__SchedulerFailedJobsPaginationFragmentConnection_failedJobs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_FailedJobEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_FailedJob",
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
                  "name": "SchedulerFailedJobItemDataFragment"
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

(node as any).hash = "ea66c414d3d3acb3a9580f556cd0f7d5";

export default node;
