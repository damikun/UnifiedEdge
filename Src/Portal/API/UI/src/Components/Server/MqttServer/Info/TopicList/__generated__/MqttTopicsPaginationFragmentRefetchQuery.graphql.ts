/**
 * @generated SignedSource<<3bef8909b18d81211070eb1d825dff39>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  server_uid: string;
};
export type MqttTopicsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttTopicsPaginationFragment">;
};
export type MqttTopicsPaginationFragmentRefetchQuery = {
  response: MqttTopicsPaginationFragmentRefetchQuery$data;
  variables: MqttTopicsPaginationFragmentRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
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
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "server_uid"
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
    "name": "MqttTopicsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttTopicsPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttTopicsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                    "name": "topic",
                    "storageKey": null
                  },
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
        "args": (v1/*: any*/),
        "filters": [
          "server_uid"
        ],
        "handle": "connection",
        "key": "MqttTopicsPaginationFragmentConnection_mqttServerTopics",
        "kind": "LinkedHandle",
        "name": "mqttServerTopics"
      },
      (v3/*: any*/)
    ]
  },
  "params": {
    "cacheID": "058789c50d554319561d0940bbc28e6f",
    "id": null,
    "metadata": {},
    "name": "MqttTopicsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttTopicsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $server_uid: ID!\n) {\n  ...MqttTopicsPaginationFragment_3VI1TY\n}\n\nfragment MqttTopicItemDataFragment on GQL_MqttTopic {\n  id\n  serverUid\n  topic\n  stats {\n    id\n    messagesCount\n  }\n}\n\nfragment MqttTopicsPaginationFragment_3VI1TY on Query {\n  mqttServerTopics(server_uid: $server_uid, first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...MqttTopicItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c9b387902897c4dba964d0568cf83562";

export default node;
