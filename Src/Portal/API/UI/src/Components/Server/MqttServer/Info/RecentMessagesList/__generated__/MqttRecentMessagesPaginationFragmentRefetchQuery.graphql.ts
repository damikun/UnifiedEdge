/**
 * @generated SignedSource<<99b459b8a0d7882a637e477e1044b5ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  client_uid?: string | null;
  first?: number | null;
  server_uid: string;
  topic_uid?: string | null;
};
export type MqttRecentMessagesPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesPaginationFragment">;
};
export type MqttRecentMessagesPaginationFragmentRefetchQuery = {
  response: MqttRecentMessagesPaginationFragmentRefetchQuery$data;
  variables: MqttRecentMessagesPaginationFragmentRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "client_uid"
  },
  {
    "defaultValue": 20,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "server_uid"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "topic_uid"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "client_uid",
    "variableName": "client_uid"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "server_uid"
  },
  {
    "kind": "Variable",
    "name": "topic_uid",
    "variableName": "topic_uid"
  }
],
v2 = {
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
    "name": "MqttRecentMessagesPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttRecentMessagesPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttRecentMessagesPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "clientUid",
                    "storageKey": null
                  },
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
                    "name": "clientId",
                    "storageKey": null
                  },
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
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
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
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "845a9622fb6e97f511455e819d494a11",
    "id": null,
    "metadata": {},
    "name": "MqttRecentMessagesPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttRecentMessagesPaginationFragmentRefetchQuery(\n  $after: String\n  $client_uid: ID = null\n  $first: Int = 20\n  $server_uid: ID!\n  $topic_uid: ID = null\n) {\n  ...MqttRecentMessagesPaginationFragment_karSk\n}\n\nfragment MqttRecentMessagesItemDataFragment on GQL_MqttMessage {\n  id\n  clientUid\n  topic\n  clientId\n  timeStamp\n}\n\nfragment MqttRecentMessagesPaginationFragment_karSk on Query {\n  mqttServerRecentMessages(server_uid: $server_uid, first: $first, after: $after, client_uid: $client_uid, topic_uid: $topic_uid) {\n    edges {\n      node {\n        id\n        ...MqttRecentMessagesItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "39b5a4be39db39e6215c22114d6347ce";

export default node;
