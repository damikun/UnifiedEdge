/**
 * @generated SignedSource<<8afa4892213a3a8b942522d69d0f0a65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerExplorerQuery$variables = {
  id: string;
};
export type MqttServerExplorerQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerSubsPaginationFragment">;
};
export type MqttServerExplorerQuery = {
  response: MqttServerExplorerQuery$data;
  variables: MqttServerExplorerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "kind": "Variable",
  "name": "server_uid",
  "variableName": "id"
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
    "name": "MqttServerExplorerQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MqttExplorerSubsPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerExplorerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttExplorerSubConnection",
        "kind": "LinkedField",
        "name": "mqttExplorerUserStoredSubs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttExplorerSubEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttExplorerSub",
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
                    "name": "color",
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
        "key": "MqttExplorerSubsPaginationFragmentConnection_mqttExplorerUserStoredSubs",
        "kind": "LinkedHandle",
        "name": "mqttExplorerUserStoredSubs"
      },
      (v3/*: any*/)
    ]
  },
  "params": {
    "cacheID": "5b93283bfcdf21b5902e6d34f902afcc",
    "id": null,
    "metadata": {},
    "name": "MqttServerExplorerQuery",
    "operationKind": "query",
    "text": "query MqttServerExplorerQuery(\n  $id: ID!\n) {\n  ...MqttExplorerSubsPaginationFragment_2YLYDF\n}\n\nfragment MqttExplorerSubItemDataFragment on GQL_MqttExplorerSub {\n  id\n  topic\n  color\n  serverUid\n}\n\nfragment MqttExplorerSubsPaginationFragment_2YLYDF on Query {\n  mqttExplorerUserStoredSubs(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttExplorerSubItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "404354dbe8805f98c9b59bc9b07f537f";

export default node;
