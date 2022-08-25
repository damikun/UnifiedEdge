/**
 * @generated SignedSource<<9b042d0c19e0b7b70111e49b3b9c619e>>
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
  readonly " $fragmentSpreads": FragmentRefs<"EdgeInfoDataFragment" | "EdgeMetricsFragment" | "ResourcesDataFragment" | "ServerListDataFragment">;
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
v2 = [
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
        "concreteType": "GQL_MqttServerConnection",
        "kind": "LinkedField",
        "name": "mqttServers",
        "plural": false,
        "selections": [
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
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttServerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttServer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRunning",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "state",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "port",
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
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "ServerListConnection_mqttServers",
        "kind": "LinkedHandle",
        "name": "mqttServers"
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
            "selections": (v2/*: any*/),
            "storageKey": "metricHistory(name:\"PAGED_MEMORY\")"
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
            "selections": (v2/*: any*/),
            "storageKey": "metricHistory(name:\"THREAD_COUNT\")"
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
            "selections": (v2/*: any*/),
            "storageKey": "metricHistory(name:\"TOTAL_CPU_USED\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1f6d13662b3c58acc0381d4b5c83343c",
    "id": null,
    "metadata": {},
    "name": "MonitorQuery",
    "operationKind": "query",
    "text": "query MonitorQuery {\n  ...EdgeInfoDataFragment\n  ...ServerListDataFragment\n  ...ResourcesDataFragment\n  ...EdgeMetricsFragment\n}\n\nfragment EdgeInfoDataFragment on Query {\n  systemInfo {\n    serverDateTime\n    targetFramework\n    osVersion {\n      platform\n      version\n    }\n    uptime {\n      days\n      hours\n      minutes\n    }\n    id\n  }\n  edgeInfo {\n    name\n    guid\n  }\n}\n\nfragment EdgeMetricsFragment on Query {\n  Memory: runtimeMetrics {\n    ...MetricTrendHistoryFragment_25nOzF\n  }\n  Threads: runtimeMetrics {\n    ...MetricTrendHistoryFragment_25BTjH\n  }\n  Cpu: runtimeMetrics {\n    ...MetricTrendHistoryFragment_2v8vXl\n  }\n}\n\nfragment MetricTrendHistoryFragment_25BTjH on GQL_RuntimeMetrics {\n  metricHistory(name: THREAD_COUNT) {\n    timeStamp\n    value\n  }\n}\n\nfragment MetricTrendHistoryFragment_25nOzF on GQL_RuntimeMetrics {\n  metricHistory(name: PAGED_MEMORY) {\n    timeStamp\n    value\n  }\n}\n\nfragment MetricTrendHistoryFragment_2v8vXl on GQL_RuntimeMetrics {\n  metricHistory(name: TOTAL_CPU_USED) {\n    timeStamp\n    value\n  }\n}\n\nfragment ResourcesDataFragment on Query {\n  runtimeMetrics {\n    cpuMetrics {\n      totalCpuUsed\n      threadCount\n      id\n    }\n    memoryMetrics {\n      memoryUssage\n      id\n    }\n  }\n  systemInfo {\n    processName\n    id\n  }\n}\n\nfragment ServerListDataFragment on Query {\n  mqttServers {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...ServerListItemDataFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ServerListItemDataFragment on GQL_MqttServer {\n  id\n  isRunning\n  name\n  state\n  port\n}\n"
  }
};
})();

(node as any).hash = "3a74d5c789071a43cdf5a8e02fd41069";

export default node;
