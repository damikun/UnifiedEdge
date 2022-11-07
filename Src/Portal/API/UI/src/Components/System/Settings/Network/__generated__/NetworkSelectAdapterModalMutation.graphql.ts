/**
 * @generated SignedSource<<62439050948f9f993783782c1c14aa4b>>
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
          }
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d1b93fed89edbe84cc42f68e199c15f0",
    "id": null,
    "metadata": {},
    "name": "NetworkSelectAdapterModalMutation",
    "operationKind": "mutation",
    "text": "mutation NetworkSelectAdapterModalMutation(\n  $input: SetEdgeDefaultNetworkAdapterInput!\n) {\n  setEdgeDefaultNetworkAdapter(input: $input) {\n    gQL_DefaultAdapter {\n      adapter {\n        id\n        name\n        interfaceType\n        physicalAddress\n        addresses {\n          gatewayAddresses\n          unicastAddresses\n        }\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6cf48e0918f126c00b3443db46818f1e";

export default node;
