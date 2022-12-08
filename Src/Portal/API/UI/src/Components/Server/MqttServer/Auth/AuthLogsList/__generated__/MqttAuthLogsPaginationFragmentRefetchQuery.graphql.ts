/**
 * @generated SignedSource<<86effb7e7328d6abe93d9dec700136ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthLogsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  auth_client_id?: string | null;
  auth_user_id?: string | null;
  first?: number | null;
  server_uid: string;
};
export type MqttAuthLogsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthLogsPaginationFragment">;
};
export type MqttAuthLogsPaginationFragmentRefetchQuery = {
  response: MqttAuthLogsPaginationFragmentRefetchQuery$data;
  variables: MqttAuthLogsPaginationFragmentRefetchQuery$variables;
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
    "name": "auth_client_id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auth_user_id"
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
    "name": "auth_client_id",
    "variableName": "auth_client_id"
  },
  {
    "kind": "Variable",
    "name": "auth_user_id",
    "variableName": "auth_user_id"
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
    "name": "MqttAuthLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthLogsPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttAuthLogConnection",
        "kind": "LinkedField",
        "name": "mqttAuthLogs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttAuthLogEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttAuthLog",
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
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "errorMessage",
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
                    "name": "jsonMetadata",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
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
          "auth_user_id",
          "auth_client_id"
        ],
        "handle": "connection",
        "key": "MqttAuthLogsPaginationFragmentConnection_mqttAuthLogs",
        "kind": "LinkedHandle",
        "name": "mqttAuthLogs"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "7d59d3020227c2a1f2cda8569504e469",
    "id": null,
    "metadata": {},
    "name": "MqttAuthLogsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttAuthLogsPaginationFragmentRefetchQuery(\n  $after: String\n  $auth_client_id: ID = null\n  $auth_user_id: ID = null\n  $first: Int = 20\n  $server_uid: ID!\n) {\n  ...MqttAuthLogsPaginationFragment_1HeDkA\n}\n\nfragment MqttAuthLogItemDataFragment on GQL_MqttAuthLog {\n  code\n  errorMessage\n  id\n  timeStamp\n  jsonMetadata\n  description\n}\n\nfragment MqttAuthLogsPaginationFragment_1HeDkA on Query {\n  mqttAuthLogs(server_uid: $server_uid, first: $first, after: $after, auth_user_id: $auth_user_id, auth_client_id: $auth_client_id) {\n    edges {\n      node {\n        id\n        ...MqttAuthLogItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "661cb1835a87dbe1184e654deb0c6115";

export default node;
