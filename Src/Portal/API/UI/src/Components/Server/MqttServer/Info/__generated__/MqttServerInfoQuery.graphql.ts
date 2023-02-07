/**
 * @generated SignedSource<<03db838d599fa122efcec8410f98391d>>
 * @relayHash 4d1bd22428012284d4e15b3dc056c00e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4d1bd22428012284d4e15b3dc056c00e

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
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientsPaginationFragment" | "MqttRecentMessagesPaginationFragment" | "MqttServerNetworkInfoFragment" | "MqttServerStatisticFragment" | "MqttTopicsPaginationFragment">;
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
  "name": "clientId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
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
v11 = {
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
v12 = [
  "server_uid"
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
};
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
      },
      {
        "kind": "Defer",
        "selections": [
          {
            "args": (v4/*: any*/),
            "kind": "FragmentSpread",
            "name": "MqttRecentMessagesPaginationFragment"
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
                      (v7/*: any*/),
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
                        "name": "isConnected",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "connectedTimeStamp",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "disconnectedTimeStamp",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessageTimestamp",
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "MqttClientsPaginationFragmentConnection_mqttServerClients",
            "kind": "LinkedHandle",
            "name": "mqttServerClients"
          },
          (v11/*: any*/)
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
            "concreteType": "GQL_MqttTopicConnection",
            "kind": "LinkedField",
            "name": "mqttServerTopics",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttTopicEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GQL_MqttTopic",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "GQL_MqttTopicStats",
                        "kind": "LinkedField",
                        "name": "stats",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "messagesCount",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": (v12/*: any*/),
            "handle": "connection",
            "key": "MqttTopicsPaginationFragmentConnection_mqttServerTopics",
            "kind": "LinkedHandle",
            "name": "mqttServerTopics"
          },
          (v11/*: any*/)
        ]
      },
      {
        "if": null,
        "kind": "Defer",
        "label": "MqttServerInfoQuery$defer$MqttRecentMessagesPaginationFragment_2YLYDF",
        "selections": [
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "GQL_MqttMessageConnection",
            "kind": "LinkedField",
            "name": "mqttServerRecentMessages",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttMessageEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GQL_MqttMessage",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "clientUid",
                        "storageKey": null
                      },
                      (v13/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "timeStamp",
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v6/*: any*/),
            "filters": [
              "server_uid",
              "client_uid",
              "topic_uid"
            ],
            "handle": "connection",
            "key": "MqttRecentMessagesPaginationFragmentConnection_mqttServerRecentMessages",
            "kind": "LinkedHandle",
            "name": "mqttServerRecentMessages"
          },
          (v11/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "id": "4d1bd22428012284d4e15b3dc056c00e",
    "metadata": {},
    "name": "MqttServerInfoQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "eeca3d93ed4533c2ae7e52c6bbeb5a58";

export default node;
