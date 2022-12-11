/**
 * @generated SignedSource<<f66394c4d90cd61bfe627b767a15cf0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttLogsQuery$variables = {
  id: string;
};
export type MqttLogsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsPaginationFragment_logs" | "ServerLogsPaginationFragment_logs">;
};
export type MqttLogsQuery = {
  response: MqttLogsQuery$data;
  variables: MqttLogsQuery$variables;
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
  "kind": "Literal",
  "name": "first",
  "value": 20
},
v3 = [
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
],
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
  "name": "timeStamp",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
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
v8 = {
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
v9 = [
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttLogsQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "ServerLogsPaginationFragment_logs"
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "InstanceLogsPaginationFragment_logs"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttLogsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_IServerEventUnionConnection",
        "kind": "LinkedField",
        "name": "serverLogs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_IServerEventUnionEdge",
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
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "iD",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      }
                    ],
                    "type": "GQL_IServerEvent",
                    "abstractKey": "__isGQL_IServerEvent"
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v8/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "server_id"
        ],
        "handle": "connection",
        "key": "ServerLogsPaginationFragmentConnection_serverLogs",
        "kind": "LinkedHandle",
        "name": "serverLogs"
      },
      (v8/*: any*/),
      {
        "if": null,
        "kind": "Defer",
        "label": "MqttLogsQuery$defer$InstanceLogsPaginationFragment_logs_1Bmzm5",
        "selections": [
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "GQL_MqttServerLogConnection",
            "kind": "LinkedField",
            "name": "mqttLogs",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttServerLogEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GQL_MqttServerLog",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "uid",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "source",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "message",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "logLevel",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "filters": [
              "server_uid"
            ],
            "handle": "connection",
            "key": "InstanceLogsPaginationFragmentConnection_mqttLogs",
            "kind": "LinkedHandle",
            "name": "mqttLogs"
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "cacheID": "679230ece5eb6663ab5b86d71a048759",
    "id": null,
    "metadata": {},
    "name": "MqttLogsQuery",
    "operationKind": "query",
    "text": "query MqttLogsQuery(\n  $id: ID!\n) {\n  ...ServerLogsPaginationFragment_logs_1Bmzm5\n  ...InstanceLogsPaginationFragment_logs_1Bmzm5 @defer(label: \"MqttLogsQuery$defer$InstanceLogsPaginationFragment_logs_1Bmzm5\")\n}\n\nfragment InstanceLogsItemDataFragment on GQL_MqttServerLog {\n  uid\n  source\n  message\n  logLevel\n  timeStamp\n}\n\nfragment InstanceLogsPaginationFragment_logs_1Bmzm5 on Query {\n  mqttLogs(server_uid: $id, first: 20) {\n    edges {\n      node {\n        uid\n        ...InstanceLogsItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ServerLogsItemDataFragment on GQL_IServerEvent {\n  __isGQL_IServerEvent: __typename\n  iD\n  name\n  timeStamp\n  type\n}\n\nfragment ServerLogsPaginationFragment_logs_1Bmzm5 on Query {\n  serverLogs(server_id: $id, first: 20) {\n    edges {\n      node {\n        __typename\n        ... on GQL_IServerEvent {\n          __isGQL_IServerEvent: __typename\n          iD\n          ...ServerLogsItemDataFragment\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "164df10ee16f208d734d1e3dffb3a0ee";

export default node;
