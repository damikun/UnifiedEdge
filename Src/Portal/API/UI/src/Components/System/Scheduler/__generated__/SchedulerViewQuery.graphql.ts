/**
 * @generated SignedSource<<d93409e936626f31e15bd386813654a8>>
 * @relayHash 8d8881109cbcc4a9aa45d86d17485181
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8d8881109cbcc4a9aa45d86d17485181

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
    "id": "8d8881109cbcc4a9aa45d86d17485181",
    "metadata": {},
    "name": "SchedulerViewQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "54672bf909b76a194f281402336094a9";

export default node;
