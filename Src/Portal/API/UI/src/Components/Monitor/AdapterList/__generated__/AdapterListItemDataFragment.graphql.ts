/**
 * @generated SignedSource<<0b731b7a5888f6e35cee44afde9cff33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AdapterState = "DOWN" | "UNKNOWN" | "UP" | "%future added value";
export type NetworkInterfaceType = "ASYMMETRIC_DSL" | "ATM" | "BASIC_ISDN" | "ETHERNET" | "ETHERNET3_MEGABIT" | "FAST_ETHERNET_FX" | "FAST_ETHERNET_T" | "FDDI" | "GENERIC_MODEM" | "GIGABIT_ETHERNET" | "HIGH_PERFORMANCE_SERIAL_BUS" | "IP_OVER_ATM" | "ISDN" | "LOOPBACK" | "MULTI_RATE_SYMMETRIC_DSL" | "PPP" | "PRIMARY_ISDN" | "RATE_ADAPT_DSL" | "SLIP" | "SYMMETRIC_DSL" | "TOKEN_RING" | "TUNNEL" | "UNKNOWN" | "VERY_HIGH_SPEED_DSL" | "WIRELESS80211" | "WMAN" | "WWANPP" | "WWANPP2" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdapterListItemDataFragment$data = {
  readonly id: string;
  readonly interfaceType: NetworkInterfaceType;
  readonly name: string;
  readonly state: AdapterState;
  readonly " $fragmentType": "AdapterListItemDataFragment";
};
export type AdapterListItemDataFragment$key = {
  readonly " $data"?: AdapterListItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterListItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterListItemDataFragment",
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
      "name": "interfaceType",
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
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "GQL_Adapter",
  "abstractKey": null
};

(node as any).hash = "483af24d018c8aaf7a986e5b02fd713b";

export default node;
