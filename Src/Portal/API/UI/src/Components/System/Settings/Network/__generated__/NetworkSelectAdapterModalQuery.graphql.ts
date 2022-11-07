/**
 * @generated SignedSource<<62857ecf5d8cc3554c42cccf5ac4d96c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NetworkInterfaceType = "ASYMMETRIC_DSL" | "ATM" | "BASIC_ISDN" | "ETHERNET" | "ETHERNET3_MEGABIT" | "FAST_ETHERNET_FX" | "FAST_ETHERNET_T" | "FDDI" | "GENERIC_MODEM" | "GIGABIT_ETHERNET" | "HIGH_PERFORMANCE_SERIAL_BUS" | "IP_OVER_ATM" | "ISDN" | "LOOPBACK" | "MULTI_RATE_SYMMETRIC_DSL" | "PPP" | "PRIMARY_ISDN" | "RATE_ADAPT_DSL" | "SLIP" | "SYMMETRIC_DSL" | "TOKEN_RING" | "TUNNEL" | "UNKNOWN" | "VERY_HIGH_SPEED_DSL" | "WIRELESS80211" | "WMAN" | "WWANPP" | "WWANPP2" | "%future added value";
export type NetworkSelectAdapterModalQuery$variables = {};
export type NetworkSelectAdapterModalQuery$data = {
  readonly defaultAdapter: {
    readonly adapter: {
      readonly addresses: {
        readonly gatewayAddresses: ReadonlyArray<string>;
        readonly unicastAddresses: ReadonlyArray<string>;
      };
      readonly id: string;
      readonly interfaceType: NetworkInterfaceType;
      readonly name: string;
      readonly physicalAddress: string;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectPaginationDataFragment">;
};
export type NetworkSelectAdapterModalQuery = {
  response: NetworkSelectAdapterModalQuery$data;
  variables: NetworkSelectAdapterModalQuery$variables;
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
  "kind": "ScalarField",
  "name": "interfaceType",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "physicalAddress",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "DTO_AdapterAddresses",
  "kind": "LinkedField",
  "name": "addresses",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "gatewayAddresses",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "unicastAddresses",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_Adapter",
  "kind": "LinkedField",
  "name": "adapter",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NetworkSelectAdapterModalQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_DefaultAdapter",
        "kind": "LinkedField",
        "name": "defaultAdapter",
        "plural": false,
        "selections": [
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "AdapterSelectPaginationDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NetworkSelectAdapterModalQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_DefaultAdapter",
        "kind": "LinkedField",
        "name": "defaultAdapter",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      },
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "state",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v4/*: any*/),
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
      }
    ]
  },
  "params": {
    "cacheID": "1e8670b99db209ad43d4fab5364d29c6",
    "id": null,
    "metadata": {},
    "name": "NetworkSelectAdapterModalQuery",
    "operationKind": "query",
    "text": "query NetworkSelectAdapterModalQuery {\n  defaultAdapter {\n    adapter {\n      id\n      name\n      interfaceType\n      physicalAddress\n      addresses {\n        gatewayAddresses\n        unicastAddresses\n      }\n    }\n    id\n  }\n  ...AdapterSelectPaginationDataFragment\n}\n\nfragment AdapterListItemDataFragment on GQL_Adapter {\n  id\n  interfaceType\n  name\n  state\n}\n\nfragment AdapterSelectDetailDataFragment on GQL_Adapter {\n  id\n  name\n  interfaceType\n  physicalAddress\n  addresses {\n    gatewayAddresses\n    unicastAddresses\n  }\n}\n\nfragment AdapterSelectPaginationDataFragment on Query {\n  adapters {\n    pageInfo {\n      hasPreviousPage\n      hasNextPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        name\n        ...AdapterListItemDataFragment\n        ...AdapterSelectDetailDataFragment\n        __typename\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3adb0b4c1e865751724e72838bdc6144";

export default node;
