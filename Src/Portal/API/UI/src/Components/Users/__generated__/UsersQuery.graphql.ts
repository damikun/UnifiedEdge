/**
 * @generated SignedSource<<5543fc42c65dab73238c594776f95e90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UsersQuery$variables = {};
export type UsersQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserListDataFragment">;
};
export type UsersQuery = {
  response: UsersQuery$data;
  variables: UsersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "UserListDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "GQL_UserConnection",
        "kind": "LinkedField",
        "name": "users",
        "plural": false,
        "selections": [
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
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_UserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_User",
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
                    "name": "firstName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastName",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sessionId",
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
          }
        ],
        "storageKey": "users(first:100)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "UserListConnection_users",
        "kind": "LinkedHandle",
        "name": "users"
      }
    ]
  },
  "params": {
    "cacheID": "128469f9e214a450249e8970e89586e3",
    "id": null,
    "metadata": {},
    "name": "UsersQuery",
    "operationKind": "query",
    "text": "query UsersQuery {\n  ...UserListDataFragment\n}\n\nfragment UserListDataFragment on Query {\n  users(first: 100) {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        ...UserListItemDataFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment UserListItemDataFragment on GQL_User {\n  id\n  firstName\n  lastName\n  sessionId\n  userName\n  enabled\n}\n"
  }
};
})();

(node as any).hash = "2c005447284f887d245367b672d35a93";

export default node;
