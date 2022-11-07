/**
 * @generated SignedSource<<b35d2e218ff2a706756d15a1d73bf56a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerFailedJobsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
};
export type SchedulerFailedJobsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerFailedJobsDataFragment">;
};
export type SchedulerFailedJobsPaginationFragmentRefetchQuery = {
  response: SchedulerFailedJobsPaginationFragmentRefetchQuery$data;
  variables: SchedulerFailedJobsPaginationFragmentRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v2 = {
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SchedulerFailedJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "SchedulerFailedJobsDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SchedulerFailedJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_FailedJobConnection",
        "kind": "LinkedField",
        "name": "failedJobs",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "jobName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reason",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "failedAt",
                    "storageKey": null
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
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "SchedulerFailedJobsPaginationFragmentConnection_failedJobs",
        "kind": "LinkedHandle",
        "name": "failedJobs"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "68318eb711e86bbc87b48728c113e9d3",
    "id": null,
    "metadata": {},
    "name": "SchedulerFailedJobsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query SchedulerFailedJobsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n) {\n  ...SchedulerFailedJobsDataFragment_2HEEH6\n}\n\nfragment SchedulerFailedJobItemDataFragment on GQL_FailedJob {\n  id\n  jobName\n  reason\n  failedAt\n}\n\nfragment SchedulerFailedJobsDataFragment_2HEEH6 on Query {\n  failedJobs(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...SchedulerFailedJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ea66c414d3d3acb3a9580f556cd0f7d5";

export default node;
