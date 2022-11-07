/**
 * @generated SignedSource<<e633568eab303f363a1ebf5b26cc3f99>>
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
          "server_uid"
        ],
        "handle": "connection",
        "key": "MqttTopicsPaginationFragmentConnection_mqttServerTopicStats",
        "kind": "LinkedHandle",
        "name": "mqttServerTopicStats"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "549d38067d39f6d7f8ee2ab3a9a11ae2",
    "id": null,
    "metadata": {},
    "name": "MqttTopicsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttTopicsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $server_uid: ID!\n) {\n  ...MqttTopicsPaginationFragment_3VI1TY\n}\n\nfragment MqttTopicItemDataFragment on GQL_MqttServerTopicStat {\n  id\n  topic\n  count\n}\n\nfragment MqttTopicsPaginationFragment_3VI1TY on Query {\n  mqttServerTopicStats(server_uid: $server_uid, first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...MqttTopicItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b45dd77a70d83c7828bb03446162b7d";

export default node;
