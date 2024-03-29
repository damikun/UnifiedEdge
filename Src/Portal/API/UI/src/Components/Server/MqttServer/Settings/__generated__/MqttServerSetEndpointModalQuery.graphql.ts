/**
 * @generated SignedSource<<57eb1c64a960f65f9e51f836afea04e1>>
 * @relayHash 366ddaaa0d0eff0187efc7b866993aeb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 366ddaaa0d0eff0187efc7b866993aeb

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerSetEndpointModalQuery$variables = {};
export type MqttServerSetEndpointModalQuery$data = {
  readonly defaultAdapter: {
    readonly adapter: {
      readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectDetailDataFragment">;
    } | null;
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectPaginationDataFragment">;
};
export type MqttServerSetEndpointModalQuery = {
  response: MqttServerSetEndpointModalQuery$data;
  variables: MqttServerSetEndpointModalQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerSetEndpointModalQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_DefaultAdapter",
        "kind": "LinkedField",
        "name": "defaultAdapter",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_Adapter",
            "kind": "LinkedField",
            "name": "adapter",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdapterSelectDetailDataFragment"
              }
            ],
            "storageKey": null
          }
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
    "name": "MqttServerSetEndpointModalQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_DefaultAdapter",
        "kind": "LinkedField",
        "name": "defaultAdapter",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
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
          }
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
    "id": "366ddaaa0d0eff0187efc7b866993aeb",
    "metadata": {},
    "name": "MqttServerSetEndpointModalQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "76f8066f3ff30683a65814cb0484938b";

export default node;
