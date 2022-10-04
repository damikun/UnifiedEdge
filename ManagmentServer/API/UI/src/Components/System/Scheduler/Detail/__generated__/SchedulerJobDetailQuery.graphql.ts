/**
 * @generated SignedSource<<7673b2a0fcc17f9736b7b9fab2c0418b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerJobDetailQuery$variables = {
  id: string;
};
export type SchedulerJobDetailQuery$data = {
  readonly node: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"FailedJobDetailDataFragment" | "RecurringJobDetailDataFragment" | "SuccessJobDetailDataFragment">;
  } | null;
};
export type SchedulerJobDetailQuery = {
  response: SchedulerJobDetailQuery$data;
  variables: SchedulerJobDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastState",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "methodCall",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_JobParameter",
  "kind": "LinkedField",
  "name": "parametrs",
  "plural": true,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_JobDetail",
  "kind": "LinkedField",
  "name": "jobDetail",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v6/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SchedulerJobDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RecurringJobDetailDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SuccessJobDetailDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FailedJobDetailDataFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SchedulerJobDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isNode"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
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
                "name": "queue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cron",
                "storageKey": null
              },
              (v7/*: any*/),
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
                "name": "lastJobState",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextExecution",
                "storageKey": null
              }
            ],
            "type": "GQL_RecurringJob",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/),
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
                "concreteType": "GQL_JobDetail",
                "kind": "LinkedField",
                "name": "jobDetail",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "GQL_SuccessJob",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exceptionDetails",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exceptionMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exceptionType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "failedAt",
                "storageKey": null
              },
              (v7/*: any*/),
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
                "name": "jobName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inFailedState",
                "storageKey": null
              }
            ],
            "type": "GQL_FailedJob",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e4ec42a755e6e31c1a2acbdf67c9bb33",
    "id": null,
    "metadata": {},
    "name": "SchedulerJobDetailQuery",
    "operationKind": "query",
    "text": "query SchedulerJobDetailQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RecurringJobDetailDataFragment\n    ...SuccessJobDetailDataFragment\n    ...FailedJobDetailDataFragment\n    id\n  }\n}\n\nfragment FailedJobDetailDataFragment on Node {\n  __isNode: __typename\n  ... on GQL_FailedJob {\n    exceptionDetails\n    exceptionMessage\n    exceptionType\n    failedAt\n    jobDetail {\n      lastState\n      methodCall\n      parametrs {\n        name\n        value\n      }\n    }\n    reason\n    jobName\n    inFailedState\n  }\n}\n\nfragment RecurringJobDetailDataFragment on Node {\n  __isNode: __typename\n  ... on GQL_RecurringJob {\n    id\n    callName\n    queue\n    createdAt\n    cron\n    jobDetail {\n      lastState\n      methodCall\n      parametrs {\n        name\n        value\n      }\n    }\n    lastExecution\n    lastJobState\n    nextExecution\n  }\n}\n\nfragment SuccessJobDetailDataFragment on Node {\n  __isNode: __typename\n  ... on GQL_SuccessJob {\n    id\n    name\n    succeededAt\n    totalDuration\n    jobDetail {\n      lastState\n      parametrs {\n        name\n        value\n      }\n      methodCall\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d8c7803e16122763e52bc026147655b8";

export default node;
