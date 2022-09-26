/**
 * @generated SignedSource<<a60ec91a6241307bc62e7168f98f0963>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MonitorQuery$variables = {};
export type MonitorQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AdapterListDataFragment" | "EdgeInfoDataFragment" | "EdgeMetricsFragment" | "ResourcesDataFragment" | "ServerListDataFragment">;
};
export type MonitorQuery = {
  response: MonitorQuery$data;
  variables: MonitorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
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
      "name": "hasPreviousPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
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
},
v7 = [
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
    "name": "value",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MonitorQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EdgeInfoDataFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AdapterListDataFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ServerListDataFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ResourcesDataFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EdgeMetricsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MonitorQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_SystemInfo",
        "kind": "LinkedField",
        "name": "systemInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "serverDateTime",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "targetFramework",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_OS",
            "kind": "LinkedField",
            "name": "osVersion",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "platform",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "version",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_Uptime",
            "kind": "LinkedField",
            "name": "uptime",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "days",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hours",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minutes",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "processName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "edgeInfo",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "guid",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_AdapterConnection",
        "kind": "LinkedField",
        "name": "adapters",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_AdapterEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_Adapter",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "interfaceType",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "AdapterListConnection_adapters",
        "kind": "LinkedHandle",
        "name": "adapters"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_IServerConnection",
        "kind": "LinkedField",
        "name": "servers",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_IServerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v0/*: any*/),
                  {
                    "kind": "TypeDiscriminator",
                    "abstractKey": "__isGQL_IServer"
                  },
                  (v1/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "ServerListConnection_servers",
        "kind": "LinkedHandle",
        "name": "servers"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_RuntimeMetrics",
        "kind": "LinkedField",
        "name": "runtimeMetrics",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_CpuMetrics",
            "kind": "LinkedField",
            "name": "cpuMetrics",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCpuUsed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "threadCount",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MemoryMetrics",
            "kind": "LinkedField",
            "name": "memoryMetrics",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "memoryUssage",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "Memory",
        "args": null,
        "concreteType": "GQL_RuntimeMetrics",
        "kind": "LinkedField",
        "name": "runtimeMetrics",
        "plural": false,
        "selections": [
          {
            "if": null,
            "kind": "Defer",
            "label": "EdgeMetricsFragment$defer$MetricTrendHistoryFragment_25nOzF",
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "name",
                    "value": "PAGED_MEMORY"
                  }
                ],
                "concreteType": "HistorianRecord",
                "kind": "LinkedField",
                "name": "metricHistory",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "metricHistory(name:\"PAGED_MEMORY\")"
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
            "if": null,
            "kind": "Defer",
            "label": "EdgeMetricsFragment$defer$MetricTrendHistoryFragment_25BTjH",
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "name",
                    "value": "THREAD_COUNT"
                  }
                ],
                "concreteType": "HistorianRecord",
                "kind": "LinkedField",
                "name": "metricHistory",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "metricHistory(name:\"THREAD_COUNT\")"
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
            "if": null,
            "kind": "Defer",
            "label": "EdgeMetricsFragment$defer$MetricTrendHistoryFragment_2v8vXl",
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "name",
                    "value": "TOTAL_CPU_USED"
                  }
                ],
                "concreteType": "HistorianRecord",
                "kind": "LinkedField",
                "name": "metricHistory",
                "plural": true,
                "selections": (v7/*: any*/),
                "storageKey": "metricHistory(name:\"TOTAL_CPU_USED\")"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9ad865944aced7f81e232702fccb7ce5",
    "id": null,
    "metadata": {},
    "name": "MonitorQuery",
    "operationKind": "query",
    "text": "query MonitorQuery {\n  ...EdgeInfoDataFragment\n  ...AdapterListDataFragment\n  ...ServerListDataFragment\n  ...ResourcesDataFragment\n  ...EdgeMetricsFragment\n}\n\nfragment AdapterListDataFragment on Query {\n  adapters {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...AdapterListItemDataFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment AdapterListItemDataFragment on GQL_Adapter {\n  id\n  interfaceType\n  name\n  state\n}\n\nfragment EdgeInfoDataFragment on Query {\n  systemInfo {\n    serverDateTime\n    targetFramework\n    osVersion {\n      platform\n      version\n    }\n    uptime {\n      days\n      hours\n      minutes\n    }\n    id\n  }\n  edgeInfo {\n    name\n    guid\n  }\n}\n\nfragment EdgeMetricsFragment on Query {\n  Memory: runtimeMetrics {\n    ...MetricTrendHistoryFragment_25nOzF @defer(label: \"EdgeMetricsFragment$defer$MetricTrendHistoryFragment_25nOzF\")\n  }\n  Threads: runtimeMetrics {\n    ...MetricTrendHistoryFragment_25BTjH @defer(label: \"EdgeMetricsFragment$defer$MetricTrendHistoryFragment_25BTjH\")\n  }\n  Cpu: runtimeMetrics {\n    ...MetricTrendHistoryFragment_2v8vXl @defer(label: \"EdgeMetricsFragment$defer$MetricTrendHistoryFragment_2v8vXl\")\n  }\n}\n\nfragment MetricTrendHistoryFragment_25BTjH on GQL_RuntimeMetrics {\n  metricHistory(name: THREAD_COUNT) {\n    timeStamp\n    value\n  }\n}\n\nfragment MetricTrendHistoryFragment_25nOzF on GQL_RuntimeMetrics {\n  metricHistory(name: PAGED_MEMORY) {\n    timeStamp\n    value\n  }\n}\n\nfragment MetricTrendHistoryFragment_2v8vXl on GQL_RuntimeMetrics {\n  metricHistory(name: TOTAL_CPU_USED) {\n    timeStamp\n    value\n  }\n}\n\nfragment ResourcesDataFragment on Query {\n  runtimeMetrics {\n    cpuMetrics {\n      totalCpuUsed\n      threadCount\n      id\n    }\n    memoryMetrics {\n      memoryUssage\n      id\n    }\n  }\n  systemInfo {\n    processName\n    id\n  }\n}\n\nfragment ServerListDataFragment on Query {\n  servers {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        __typename\n        id\n        ...ServerListItemDataFragment\n      }\n      cursor\n    }\n  }\n}\n\nfragment ServerListItemDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  name\n  state\n  type\n  __typename\n}\n"
  }
};
})();

(node as any).hash = "fb911420f80cd4060ed292cb77398fec";

export default node;
