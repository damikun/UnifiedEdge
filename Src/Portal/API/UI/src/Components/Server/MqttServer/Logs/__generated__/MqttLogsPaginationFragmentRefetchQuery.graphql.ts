/**
 * @generated SignedSource<<f1b1cfa92f0364e37b95eaab64b36585>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttLogsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type MqttLogsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttLogsPaginationFragment_logs">;
};
export type MqttLogsPaginationFragmentRefetchQuery = {
  response: MqttLogsPaginationFragmentRefetchQuery$data;
  variables: MqttLogsPaginationFragmentRefetchQuery$variables;
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
    "name": "id"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = {
  "kind": "Variable",
  "name": "id",
  "variableName": "id"
},
v4 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "id"
  }
],
v5 = {
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
    "name": "MqttLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MqttLogsPaginationFragment_logs"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
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
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
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
        "args": [
          (v3/*: any*/)
        ],
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
      (v5/*: any*/)
    ]
  },
  "params": {
    "cacheID": "81ea9df84611b07eaf4900b953311535",
    "id": null,
    "metadata": {},
    "name": "MqttLogsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttLogsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $id: ID!\n) {\n  ...MqttLogsPaginationFragment_logs_XKRaI\n}\n\nfragment MqttLogsBarEnableFragment_1wA4Dm on Query {\n  mqttServerById(id: $id) {\n    id\n    loggingEnabled\n  }\n}\n\nfragment MqttLogsItemDataFragment on GQL_MqttServerLog {\n  uid\n  source\n  message\n  logLevel\n  timeStamp\n}\n\nfragment MqttLogsPaginationFragment_logs_XKRaI on Query {\n  mqttLogs(server_uid: $id, first: $first, after: $after) {\n    edges {\n      node {\n        uid\n        ...MqttLogsItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  ...MqttLogsBarEnableFragment_1wA4Dm\n}\n"
  }
};
})();

(node as any).hash = "6c71f0f616965d2ffece4d447008ce60";

export default node;
