/**
 * @generated SignedSource<<e084a515d1e983cea09b3d4fdd94cd9c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthUsersPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  server_uid: string;
};
export type MqttAuthUsersPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthUsersPaginationFragment">;
};
export type MqttAuthUsersPaginationFragmentRefetchQuery = {
  response: MqttAuthUsersPaginationFragmentRefetchQuery$data;
  variables: MqttAuthUsersPaginationFragmentRefetchQuery$variables;
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
    "name": "MqttAuthUsersPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthUsersPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUsersPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttAuthUserConnection",
        "kind": "LinkedField",
        "name": "mqttAuthUsers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttAuthUserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttAuthUser",
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
                    "name": "userName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "enabled",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastAuthenticate",
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
        "key": "MqttAuthUsersPaginationFragmentConnection_mqttAuthUsers",
        "kind": "LinkedHandle",
        "name": "mqttAuthUsers"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "b6c36dc75b5f91603c2c53f3db959a16",
    "id": null,
    "metadata": {},
    "name": "MqttAuthUsersPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttAuthUsersPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $server_uid: ID!\n) {\n  ...MqttAuthUsersPaginationFragment_3VI1TY\n}\n\nfragment MqttAuthUserItemDataFragment on GQL_MqttAuthUser {\n  userName\n  enabled\n  lastAuthenticate\n  id\n}\n\nfragment MqttAuthUsersPaginationFragment_3VI1TY on Query {\n  mqttAuthUsers(server_uid: $server_uid, first: $first, after: $after) {\n    edges {\n      node {\n        id\n        userName\n        ...MqttAuthUserItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f0a628a8e3a815e15274878d968c278";

export default node;
