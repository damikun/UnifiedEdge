/**
 * @generated SignedSource<<c66f7472c85eb56d60b2f7c093f7da9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NetworkInterfaceType = "ASYMMETRIC_DSL" | "ATM" | "BASIC_ISDN" | "ETHERNET" | "ETHERNET3_MEGABIT" | "FAST_ETHERNET_FX" | "FAST_ETHERNET_T" | "FDDI" | "GENERIC_MODEM" | "GIGABIT_ETHERNET" | "HIGH_PERFORMANCE_SERIAL_BUS" | "IP_OVER_ATM" | "ISDN" | "LOOPBACK" | "MULTI_RATE_SYMMETRIC_DSL" | "PPP" | "PRIMARY_ISDN" | "RATE_ADAPT_DSL" | "SLIP" | "SYMMETRIC_DSL" | "TOKEN_RING" | "TUNNEL" | "UNKNOWN" | "VERY_HIGH_SPEED_DSL" | "WIRELESS80211" | "WMAN" | "WWANPP" | "WWANPP2" | "%future added value";
export type SetEdgeDefaultNetworkAdapterInput = {
  adapter_id: string;
};
export type NetworkSelectAdapterModalMutation$variables = {
  input: SetEdgeDefaultNetworkAdapterInput;
};
export type NetworkSelectAdapterModalMutation$data = {
  readonly setEdgeDefaultNetworkAdapter: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_DefaultAdapter: {
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
    } | null;
  };
};
export type NetworkSelectAdapterModalMutation = {
  response: NetworkSelectAdapterModalMutation$data;
  variables: NetworkSelectAdapterModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_Adapter",
  "kind": "LinkedField",
  "name": "adapter",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
      "name": "interfaceType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "physicalAddress",
      "storageKey": null
    },
    {
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
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
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
          "concreteType": "ErrorSource",
          "kind": "LinkedField",
          "name": "errors",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "property",
              "storageKey": null
            },
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "ValidationError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v4/*: any*/)
      ],
      "type": "ResultError",
      "abstractKey": "__isResultError"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NetworkSelectAdapterModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetEdgeDefaultNetworkAdapterPayload",
        "kind": "LinkedField",
        "name": "setEdgeDefaultNetworkAdapter",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_DefaultAdapter",
            "kind": "LinkedField",
            "name": "gQL_DefaultAdapter",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NetworkSelectAdapterModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetEdgeDefaultNetworkAdapterPayload",
        "kind": "LinkedField",
        "name": "setEdgeDefaultNetworkAdapter",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_DefaultAdapter",
            "kind": "LinkedField",
            "name": "gQL_DefaultAdapter",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a58f345606dbee80180aad23a0330137",
    "id": null,
    "metadata": {},
    "name": "NetworkSelectAdapterModalMutation",
    "operationKind": "mutation",
    "text": "mutation NetworkSelectAdapterModalMutation(\n  $input: SetEdgeDefaultNetworkAdapterInput!\n) {\n  setEdgeDefaultNetworkAdapter(input: $input) {\n    gQL_DefaultAdapter {\n      adapter {\n        id\n        name\n        interfaceType\n        physicalAddress\n        addresses {\n          gatewayAddresses\n          unicastAddresses\n        }\n      }\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f2edf73366ae62e28d611e874729c24";

export default node;
