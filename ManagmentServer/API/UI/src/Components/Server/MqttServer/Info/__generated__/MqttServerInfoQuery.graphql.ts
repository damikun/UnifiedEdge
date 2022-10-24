/**
 * @generated SignedSource<<64b11336c4f09555ad1771ed9a600886>>
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
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientsPaginationFragment" | "MqttServerNetworkInfoFragment" | "MqttServerStatisticFragment">;
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
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "serverUid",
  "storageKey": null
},
v7 = {
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
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttClientsPaginationFragment"
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
        "args": (v5/*: any*/),
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "connectedAt",
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
          (v7/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": [
          "server_uid"
        ],
        "handle": "connection",
        "key": "MqttClientsPaginationFragmentConnection_mqttServerClients",
        "kind": "LinkedHandle",
        "name": "mqttServerClients"
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
          (v6/*: any*/)
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
      (v7/*: any*/)
    ]
  },
  "params": {
    "cacheID": "f8aa8f0e77650164f37889cf1c2065c2",
    "id": null,
    "metadata": {},
    "name": "MqttServerInfoQuery",
    "operationKind": "query",
    "text": "query MqttServerInfoQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    id\n    ...ServerSharedInfoFragment\n  }\n  ...MqttClientsPaginationFragment_2YLYDF\n  ...MqttServerNetworkInfoFragment_2YLYDF\n  ...MqttServerStatisticFragment_2YLYDF\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  rawId\n  protocol\n  serverUid\n  connectedAt\n}\n\nfragment MqttClientsPaginationFragment_2YLYDF on Query {\n  mqttServerClients(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttClientItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MqttServerNetworkInfoFragment_2YLYDF on Query {\n  mqttServerEndpoint(server_uid: $id) {\n    id\n    iPAddress\n    port\n    serverUid\n  }\n  mqttServerStats(server_uid: $id) {\n    id\n    packetRcvCount\n    packetSndCount\n  }\n}\n\nfragment MqttServerStatisticFragment_2YLYDF on Query {\n  mqttServerStats(server_uid: $id) {\n    id\n    connectionsCount\n    notConsumedCount\n    publishedTopicCount\n    subscribedTopicCount\n    subscriptionsCount\n  }\n}\n\nfragment ServerSharedInfoFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n}\n"
  }
};
})();

(node as any).hash = "307e3f6c962449bf9164a9482e995dc1";

export default node;
