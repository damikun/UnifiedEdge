/**
 * @generated SignedSource<<a5ddf475621d897efc718b8aa6436f1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NetworkInterfaceType = "ASYMMETRIC_DSL" | "ATM" | "BASIC_ISDN" | "ETHERNET" | "ETHERNET3_MEGABIT" | "FAST_ETHERNET_FX" | "FAST_ETHERNET_T" | "FDDI" | "GENERIC_MODEM" | "GIGABIT_ETHERNET" | "HIGH_PERFORMANCE_SERIAL_BUS" | "IP_OVER_ATM" | "ISDN" | "LOOPBACK" | "MULTI_RATE_SYMMETRIC_DSL" | "PPP" | "PRIMARY_ISDN" | "RATE_ADAPT_DSL" | "SLIP" | "SYMMETRIC_DSL" | "TOKEN_RING" | "TUNNEL" | "UNKNOWN" | "VERY_HIGH_SPEED_DSL" | "WIRELESS80211" | "WMAN" | "WWANPP" | "WWANPP2" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NetworkDefaultAdapterDataFragment$data = {
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
  readonly " $fragmentType": "NetworkDefaultAdapterDataFragment";
};
export type NetworkDefaultAdapterDataFragment$key = {
  readonly " $data"?: NetworkDefaultAdapterDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NetworkDefaultAdapterDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NetworkDefaultAdapterDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_DefaultAdapter",
      "kind": "LinkedField",
      "name": "defaultAdapter",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_Adapter",
          "kind": "LinkedField",
          "name": "adapter",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1b3210a1bdb5b79f55aa31e9e6c4e4ae";

export default node;
