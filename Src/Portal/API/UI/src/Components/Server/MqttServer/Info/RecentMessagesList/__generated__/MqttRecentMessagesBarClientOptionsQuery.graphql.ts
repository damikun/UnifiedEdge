/**
 * @generated SignedSource<<53c204c725478ae9c17978cae81529f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesBarClientOptionsQuery$variables = {
  server_uid: string;
};
export type MqttRecentMessagesBarClientOptionsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientsPaginationFragment">;
};
export type MqttRecentMessagesBarClientOptionsQuery = {
  response: MqttRecentMessagesBarClientOptionsQuery$data;
  variables: MqttRecentMessagesBarClientOptionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "server_uid"
  }
],
v1 = {
  "kind": "Variable",
  "name": "server_uid",
  "variableName": "server_uid"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v1/*: any*/)
],
v3 = {
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
    "name": "MqttRecentMessagesBarClientOptionsQuery",
    "selections": [
      {
        "kind": "Defer",
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "MqttClientsPaginationFragment"
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
    "name": "MqttRecentMessagesBarClientOptionsQuery",
    "selections": [
      {
        "if": null,
        "kind": "Defer",
        "label": "MqttRecentMessagesBarClientOptionsQuery$defer$MqttClientsPaginationFragment_9QbYl",
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
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
                        "name": "clientId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "protocol",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "serverUid",
                        "storageKey": null
                      },
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "server_uid"
            ],
            "handle": "connection",
            "key": "MqttClientsPaginationFragmentConnection_mqttServerClients",
            "kind": "LinkedHandle",
            "name": "mqttServerClients"
          },
          (v3/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "cacheID": "fce5b2ff84a6342851adbbb6164a2718",
    "id": null,
    "metadata": {},
    "name": "MqttRecentMessagesBarClientOptionsQuery",
    "operationKind": "query",
    "text": "query MqttRecentMessagesBarClientOptionsQuery(\n  $server_uid: ID!\n) {\n  ...MqttClientsPaginationFragment_9QbYl @defer(label: \"MqttRecentMessagesBarClientOptionsQuery$defer$MqttClientsPaginationFragment_9QbYl\")\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  clientId\n  protocol\n  serverUid\n  isConnected\n  connectedTimeStamp\n  disconnectedTimeStamp\n  lastMessageTimestamp\n}\n\nfragment MqttClientsPaginationFragment_9QbYl on Query {\n  mqttServerClients(server_uid: $server_uid, first: 20) {\n    edges {\n      node {\n        id\n        clientId\n        ...MqttClientItemDataFragment\n        ...MqttRecentMessagesBarClientOptionFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MqttRecentMessagesBarClientOptionFragment on GQL_MqttClient {\n  id\n  clientId\n}\n"
  }
};
})();

(node as any).hash = "fdacc61bbbe6b7761bad279f40c11e3d";

export default node;
