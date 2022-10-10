/**
 * @generated SignedSource<<92ce7430a70c4e5f44ebdb12ea156781>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdapterSelectQuery$variables = {};
export type AdapterSelectQuery$data = {
  readonly defaultAdapter: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectPaginationDataFragment">;
};
export type AdapterSelectQuery = {
  response: AdapterSelectQuery$data;
  variables: AdapterSelectQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_Adapter",
  "kind": "LinkedField",
  "name": "defaultAdapter",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdapterSelectQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AdapterSelectPaginationDataFragment"
      },
      (v2/*: any*/)
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AdapterSelectQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_AdapterConnection",
        "kind": "LinkedField",
        "name": "adapters",
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
            "concreteType": "GQL_AdapterEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_Adapter",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "interfaceType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "state",
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
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "filters": null,
        "handle": "connection",
        "key": "AdapterSelectPagination_adapters",
        "kind": "LinkedHandle",
        "name": "adapters"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "735954491c3957ae2df410bf1c8361fb",
    "id": null,
    "metadata": {},
    "name": "AdapterSelectQuery",
    "operationKind": "query",
    "text": "query AdapterSelectQuery {\n  ...AdapterSelectPaginationDataFragment\n  defaultAdapter {\n    id\n    name\n  }\n}\n\nfragment AdapterListItemDataFragment on GQL_Adapter {\n  id\n  interfaceType\n  name\n  state\n}\n\nfragment AdapterSelectPaginationDataFragment on Query {\n  adapters {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        name\n        ...AdapterListItemDataFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61bc8e09dac04f56ba7730c66398306a";

export default node;
