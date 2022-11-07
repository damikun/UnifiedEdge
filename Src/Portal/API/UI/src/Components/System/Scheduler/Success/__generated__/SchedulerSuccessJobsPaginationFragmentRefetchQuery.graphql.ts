/**
 * @generated SignedSource<<3deac58076d31a9bea94ae84dee4dadf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerSuccessJobsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
};
export type SchedulerSuccessJobsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerSuccessJobsDataFragment">;
};
export type SchedulerSuccessJobsPaginationFragmentRefetchQuery = {
  response: SchedulerSuccessJobsPaginationFragmentRefetchQuery$data;
  variables: SchedulerSuccessJobsPaginationFragmentRefetchQuery$variables;
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
    "name": "SchedulerSuccessJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "SchedulerSuccessJobsDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SchedulerSuccessJobsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_SuccessJobConnection",
        "kind": "LinkedField",
        "name": "successJobs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_SuccessJobEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_SuccessJob",
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
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "succeededAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalDuration",
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
        "key": "SchedulerSuccessJobsPaginationFragmentConnection_successJobs",
        "kind": "LinkedHandle",
        "name": "successJobs"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "0ec21e5d1aa5083e6f7ed0adc909b984",
    "id": null,
    "metadata": {},
    "name": "SchedulerSuccessJobsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query SchedulerSuccessJobsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n) {\n  ...SchedulerSuccessJobsDataFragment_2HEEH6\n}\n\nfragment SchedulerSuccessJobItemDataFragment on GQL_SuccessJob {\n  id\n  name\n  succeededAt\n  totalDuration\n}\n\nfragment SchedulerSuccessJobsDataFragment_2HEEH6 on Query {\n  successJobs(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...SchedulerSuccessJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f1f5b5eb6aecd616484bbb7d2be400ca";

export default node;
