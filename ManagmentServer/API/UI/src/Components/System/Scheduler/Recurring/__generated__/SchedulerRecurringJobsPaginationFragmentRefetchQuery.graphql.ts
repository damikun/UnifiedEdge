/**
 * @generated SignedSource<<3ee36a7bfae90ff9614bacdb2f875f18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerRecurringJobsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
};
export type SchedulerRecurringJobsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerRecurringJobsDataFragment">;
};
export type SchedulerRecurringJobsPaginationFragmentRefetchQuery = {
  response: SchedulerRecurringJobsPaginationFragmentRefetchQuery$data;
  variables: SchedulerRecurringJobsPaginationFragmentRefetchQuery$variables;
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
    "name": "SchedulerRecurringJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "SchedulerRecurringJobsDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SchedulerRecurringJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_RecurringJobConnection",
        "kind": "LinkedField",
        "name": "recurringJobs",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "callName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastJobState",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastExecution",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nextExecution",
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
        "key": "SchedulerRecurringJobsPaginationFragmentConnection_recurringJobs",
        "kind": "LinkedHandle",
        "name": "recurringJobs"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "4ae1afbe71ba8c6dcb595d5d81be97e1",
    "id": null,
    "metadata": {},
    "name": "SchedulerRecurringJobsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query SchedulerRecurringJobsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n) {\n  ...SchedulerRecurringJobsDataFragment_2HEEH6\n}\n\nfragment SchedulerRecurringJobItemDataFragment on GQL_RecurringJob {\n  id\n  callName\n  lastJobState\n  lastExecution\n  nextExecution\n}\n\nfragment SchedulerRecurringJobsDataFragment_2HEEH6 on Query {\n  recurringJobs(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...SchedulerRecurringJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7dd9423abe90bf4c55e219dfaec837e0";

export default node;
