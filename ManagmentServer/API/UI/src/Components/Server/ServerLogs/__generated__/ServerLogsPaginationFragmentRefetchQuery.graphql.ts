/**
 * @generated SignedSource<<cbd519067f944397d2e2efacc3c603f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerLogsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type ServerLogsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ServerLogsPaginationFragment_logs">;
};
export type ServerLogsPaginationFragmentRefetchQuery = {
  response: ServerLogsPaginationFragmentRefetchQuery$data;
  variables: ServerLogsPaginationFragmentRefetchQuery$variables;
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
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
],
v4 = {
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
    "name": "ServerLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "FragmentSpread",
        "name": "ServerLogsPaginationFragment_logs"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_IServerEventUnionConnection",
        "kind": "LinkedField",
        "name": "serverLogs",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_IServerEventUnionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "iD",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
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
                        "name": "type",
                        "storageKey": null
                      }
                    ],
                    "type": "GQL_IServerEvent",
                    "abstractKey": "__isGQL_IServerEvent"
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
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "server_id"
        ],
        "handle": "connection",
        "key": "ServerLogsPaginationFragmentConnection_serverLogs",
        "kind": "LinkedHandle",
        "name": "serverLogs"
      },
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "9daee644ac0689d0f8ca6b45823d6dc6",
    "id": null,
    "metadata": {},
    "name": "ServerLogsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query ServerLogsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $id: ID!\n) {\n  ...ServerLogsPaginationFragment_logs_XKRaI\n}\n\nfragment ServerLogsItemDataFragment on GQL_IServerEvent {\n  __isGQL_IServerEvent: __typename\n  iD\n  name\n  timeStamp\n  type\n}\n\nfragment ServerLogsPaginationFragment_logs_XKRaI on Query {\n  serverLogs(server_id: $id, first: $first, after: $after) {\n    edges {\n      node {\n        __typename\n        ... on GQL_IServerEvent {\n          __isGQL_IServerEvent: __typename\n          iD\n          ...ServerLogsItemDataFragment\n        }\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9907c444e2f2b1fd34c94177d5b779a";

export default node;
