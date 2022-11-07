/**
 * @generated SignedSource<<d383f1b3c960f1b47927f35680bb5bb2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerViewQuery$variables = {};
export type SchedulerViewQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerFailedJobsDataFragment" | "SchedulerRecurringJobsDataFragment" | "SchedulerStatisticsFragment_jobsStatistic" | "SchedulerSuccessJobsDataFragment">;
};
export type SchedulerViewQuery = {
  response: SchedulerViewQuery$data;
  variables: SchedulerViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "date",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "count",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
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
v6 = {
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SchedulerViewQuery",
    "selections": [
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SchedulerStatisticsFragment_jobsStatistic"
          }
        ]
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SchedulerFailedJobsDataFragment"
          }
        ]
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SchedulerSuccessJobsDataFragment"
          }
        ]
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SchedulerRecurringJobsDataFragment"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SchedulerViewQuery",
    "selections": [
      {
        "if": null,
        "kind": "Defer",
        "label": "SchedulerViewQuery$defer$SchedulerStatisticsFragment_jobsStatistic",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_JobsStatistic",
            "kind": "LinkedField",
            "name": "jobsStatistic",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_CountByDate",
                "kind": "LinkedField",
                "name": "recentFailedByDate",
                "plural": true,
                "selections": (v0/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_CountByDate",
                "kind": "LinkedField",
                "name": "recentSucceededByDate",
                "plural": true,
                "selections": (v0/*: any*/),
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "SchedulerViewQuery$defer$SchedulerFailedJobsDataFragment",
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      (v1/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "failedJobs(first:20)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SchedulerFailedJobsPaginationFragmentConnection_failedJobs",
            "kind": "LinkedHandle",
            "name": "failedJobs"
          },
          (v6/*: any*/)
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "SchedulerViewQuery$defer$SchedulerSuccessJobsDataFragment",
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      (v1/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "successJobs(first:20)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SchedulerSuccessJobsPaginationFragmentConnection_successJobs",
            "kind": "LinkedHandle",
            "name": "successJobs"
          },
          (v6/*: any*/)
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "SchedulerViewQuery$defer$SchedulerRecurringJobsDataFragment",
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                      (v1/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "recurringJobs(first:20)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "SchedulerRecurringJobsPaginationFragmentConnection_recurringJobs",
            "kind": "LinkedHandle",
            "name": "recurringJobs"
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "cacheID": "8d8881109cbcc4a9aa45d86d17485181",
    "id": null,
    "metadata": {},
    "name": "SchedulerViewQuery",
    "operationKind": "query",
    "text": "query SchedulerViewQuery {\n  ...SchedulerStatisticsFragment_jobsStatistic @defer(label: \"SchedulerViewQuery$defer$SchedulerStatisticsFragment_jobsStatistic\")\n  ...SchedulerFailedJobsDataFragment @defer(label: \"SchedulerViewQuery$defer$SchedulerFailedJobsDataFragment\")\n  ...SchedulerSuccessJobsDataFragment @defer(label: \"SchedulerViewQuery$defer$SchedulerSuccessJobsDataFragment\")\n  ...SchedulerRecurringJobsDataFragment @defer(label: \"SchedulerViewQuery$defer$SchedulerRecurringJobsDataFragment\")\n}\n\nfragment SchedulerFailedJobItemDataFragment on GQL_FailedJob {\n  id\n  jobName\n  reason\n  failedAt\n}\n\nfragment SchedulerFailedJobsDataFragment on Query {\n  failedJobs(first: 20) {\n    edges {\n      node {\n        id\n        ...SchedulerFailedJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SchedulerRecurringJobItemDataFragment on GQL_RecurringJob {\n  id\n  callName\n  lastJobState\n  lastExecution\n  nextExecution\n}\n\nfragment SchedulerRecurringJobsDataFragment on Query {\n  recurringJobs(first: 20) {\n    edges {\n      node {\n        id\n        ...SchedulerRecurringJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SchedulerStatisticsFragment_jobsStatistic on Query {\n  jobsStatistic {\n    recentFailedByDate {\n      date\n      count\n    }\n    recentSucceededByDate {\n      date\n      count\n    }\n    id\n  }\n}\n\nfragment SchedulerSuccessJobItemDataFragment on GQL_SuccessJob {\n  id\n  name\n  succeededAt\n  totalDuration\n}\n\nfragment SchedulerSuccessJobsDataFragment on Query {\n  successJobs(first: 20) {\n    edges {\n      node {\n        id\n        ...SchedulerSuccessJobItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "54672bf909b76a194f281402336094a9";

export default node;
