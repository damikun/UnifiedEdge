/**
 * @generated SignedSource<<f29415724eebb74b426e23158a387b56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerInfoQuery$variables = {
  id: string;
};
export type MqttServerInfoQuery$data = {
  readonly mqttServerById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ServerSharedInfoFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientsPaginationFragment" | "MqttServerNetworkInfoFragment" | "MqttServerStatisticFragment" | "MqttTopicsPaginationFragment">;
};
export type MqttServerInfoQuery = {
  response: MqttServerInfoQuery$data;
  variables: MqttServerInfoQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "kind": "Variable",
  "name": "server_uid",
  "variableName": "id"
},
v4 = [
  (v3/*: any*/)
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serverUid",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v3/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
v10 = {
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
v11 = [
  "server_uid"
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerSharedInfoFragment"
          }
        ],
        "storageKey": null
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": (v4/*: any*/),
            "kind": "FragmentSpread",
            "name": "MqttClientsPaginationFragment"
          }
        ]
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttServerNetworkInfoFragment"
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttServerStatisticFragment"
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": (v4/*: any*/),
            "kind": "FragmentSpread",
            "name": "MqttTopicsPaginationFragment"
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
    "name": "MqttServerInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isGQL_IServer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "GQL_MqttServerEndpoint",
        "kind": "LinkedField",
        "name": "mqttServerEndpoint",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "iPAddress",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "port",
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "GQL_MqttServerStats",
        "kind": "LinkedField",
        "name": "mqttServerStats",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "packetRcvCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "packetSndCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "connectionsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "notConsumedCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "publishedTopicCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "subscribedTopicCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "subscriptionsCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "MqttServerInfoQuery$defer$MqttClientsPaginationFragment_2YLYDF",
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "GQL_MqttClientConnection",
            "kind": "LinkedField",
            "name": "mqttServerClients",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttClientEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GQL_MqttClient",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "rawId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "protocol",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "connectedAt",
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": (v11/*: any*/),
            "handle": "connection",
            "key": "MqttClientsPaginationFragmentConnection_mqttServerClients",
            "kind": "LinkedHandle",
            "name": "mqttServerClients"
          },
          (v10/*: any*/)
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "MqttServerInfoQuery$defer$MqttTopicsPaginationFragment_2YLYDF",
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "GQL_MqttServerTopicStatConnection",
            "kind": "LinkedField",
            "name": "mqttServerTopicStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttServerTopicStatEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GQL_MqttServerTopicStat",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "topic",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": (v11/*: any*/),
            "handle": "connection",
            "key": "MqttTopicsPaginationFragmentConnection_mqttServerTopicStats",
            "kind": "LinkedHandle",
            "name": "mqttServerTopicStats"
          },
          (v10/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "cacheID": "4e7497948a6f376b7bd07f41e9289561",
    "id": null,
    "metadata": {},
    "name": "MqttServerInfoQuery",
    "operationKind": "query",
    "text": "query MqttServerInfoQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    id\n    ...ServerSharedInfoFragment\n  }\n  ...MqttClientsPaginationFragment_2YLYDF @defer(label: \"MqttServerInfoQuery$defer$MqttClientsPaginationFragment_2YLYDF\")\n  ...MqttServerNetworkInfoFragment_2YLYDF\n  ...MqttServerStatisticFragment_2YLYDF\n  ...MqttTopicsPaginationFragment_2YLYDF @defer(label: \"MqttServerInfoQuery$defer$MqttTopicsPaginationFragment_2YLYDF\")\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  rawId\n  protocol\n  serverUid\n  connectedAt\n}\n\nfragment MqttClientsPaginationFragment_2YLYDF on Query {\n  mqttServerClients(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttClientItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MqttServerNetworkInfoFragment_2YLYDF on Query {\n  mqttServerEndpoint(server_uid: $id) {\n    id\n    iPAddress\n    port\n    serverUid\n  }\n  mqttServerStats(server_uid: $id) {\n    id\n    packetRcvCount\n    packetSndCount\n  }\n}\n\nfragment MqttServerStatisticFragment_2YLYDF on Query {\n  mqttServerStats(server_uid: $id) {\n    id\n    connectionsCount\n    notConsumedCount\n    publishedTopicCount\n    subscribedTopicCount\n    subscriptionsCount\n  }\n}\n\nfragment MqttTopicItemDataFragment on GQL_MqttServerTopicStat {\n  id\n  topic\n  count\n}\n\nfragment MqttTopicsPaginationFragment_2YLYDF on Query {\n  mqttServerTopicStats(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttTopicItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment ServerSharedInfoFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n}\n"
  }
};
})();

(node as any).hash = "390679cf4d247d35c8fb1d9f3f343b94";

export default node;
