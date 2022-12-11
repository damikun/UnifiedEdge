/**
 * @generated SignedSource<<10e92c9c29f6b6c945c335f76b6e1fe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttLogsViewQuery$variables = {
  id: string;
};
export type MqttLogsViewQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttLogsPaginationFragment_logs" | "ServerLogsPaginationFragment_logs">;
};
export type MqttLogsViewQuery = {
  response: MqttLogsViewQuery$data;
  variables: MqttLogsViewQuery$variables;
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
    "name": "MqttLogsViewQuery",
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
            "name": "MqttLogsPaginationFragment_logs"
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
    "name": "MqttLogsViewQuery",
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
        "label": "MqttLogsViewQuery$defer$MqttLogsPaginationFragment_logs_1Bmzm5",
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
            "key": "MqttLogsPaginationFragmentConnection_mqttLogs",
            "kind": "LinkedHandle",
            "name": "mqttLogs"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "GQL_MqttServer",
            "kind": "LinkedField",
            "name": "mqttServerById",
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
                "name": "loggingEnabled",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "cacheID": "c54d7b108ea26f8d1fce4ac1caaf9434",
    "id": null,
    "metadata": {},
    "name": "MqttLogsViewQuery",
    "operationKind": "query",
    "text": "query MqttLogsViewQuery(\n  $id: ID!\n) {\n  ...ServerLogsPaginationFragment_logs_1Bmzm5\n  ...MqttLogsPaginationFragment_logs_1Bmzm5 @defer(label: \"MqttLogsViewQuery$defer$MqttLogsPaginationFragment_logs_1Bmzm5\")\n}\n\nfragment MqttLogsBarEnableFragment_1wA4Dm on Query {\n  mqttServerById(id: $id) {\n    id\n    loggingEnabled\n  }\n}\n\nfragment MqttLogsItemDataFragment on GQL_MqttServerLog {\n  uid\n  source\n  message\n  logLevel\n  timeStamp\n}\n\nfragment MqttLogsPaginationFragment_logs_1Bmzm5 on Query {\n  mqttLogs(server_uid: $id, first: 20) {\n    edges {\n      node {\n        uid\n        ...MqttLogsItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...MqttLogsBarEnableFragment_1wA4Dm\n}\n\nfragment ServerLogsItemDataFragment on GQL_IServerEvent {\n  __isGQL_IServerEvent: __typename\n  iD\n  name\n  timeStamp\n  type\n}\n\nfragment ServerLogsPaginationFragment_logs_1Bmzm5 on Query {\n  serverLogs(server_id: $id, first: 20) {\n    edges {\n      node {\n        __typename\n        ... on GQL_IServerEvent {\n          __isGQL_IServerEvent: __typename\n          iD\n          ...ServerLogsItemDataFragment\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1180f1a6874976454e40f5901acbd1c6";

export default node;
