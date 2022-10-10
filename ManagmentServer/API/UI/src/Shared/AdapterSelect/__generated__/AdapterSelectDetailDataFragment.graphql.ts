/**
 * @generated SignedSource<<40dd7c4c5c92d367a464bc4dd6ea1489>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NetworkInterfaceType = "ASYMMETRIC_DSL" | "ATM" | "BASIC_ISDN" | "ETHERNET" | "ETHERNET3_MEGABIT" | "FAST_ETHERNET_FX" | "FAST_ETHERNET_T" | "FDDI" | "GENERIC_MODEM" | "GIGABIT_ETHERNET" | "HIGH_PERFORMANCE_SERIAL_BUS" | "IP_OVER_ATM" | "ISDN" | "LOOPBACK" | "MULTI_RATE_SYMMETRIC_DSL" | "PPP" | "PRIMARY_ISDN" | "RATE_ADAPT_DSL" | "SLIP" | "SYMMETRIC_DSL" | "TOKEN_RING" | "TUNNEL" | "UNKNOWN" | "VERY_HIGH_SPEED_DSL" | "WIRELESS80211" | "WMAN" | "WWANPP" | "WWANPP2" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdapterSelectDetailDataFragment$data = {
  readonly addresses: {
    readonly gatewayAddresses: ReadonlyArray<string>;
    readonly unicastAddresses: ReadonlyArray<string>;
  };
  readonly id: string;
  readonly interfaceType: NetworkInterfaceType;
  readonly name: string;
  readonly physicalAddress: string;
  readonly " $fragmentType": "AdapterSelectDetailDataFragment";
};
export type AdapterSelectDetailDataFragment$key = {
  readonly " $data"?: AdapterSelectDetailDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectDetailDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterSelectDetailDataFragment",
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
  "type": "GQL_Adapter",
  "abstractKey": null
};

(node as any).hash = "2fb3720c51fa7ae7e5f871994728cd8b";

export default node;
