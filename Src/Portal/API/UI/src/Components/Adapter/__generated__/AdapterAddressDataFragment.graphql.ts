/**
 * @generated SignedSource<<322b400453b5db51379bc89d071bd148>>
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
export type AdapterAddressDataFragment$data = {
  readonly addresses: {
    readonly dhcpServerAddresses: ReadonlyArray<string>;
    readonly dnsAddresses: ReadonlyArray<string>;
    readonly gatewayAddresses: ReadonlyArray<string>;
    readonly multicastAddresses: ReadonlyArray<string>;
    readonly unicastAddresses: ReadonlyArray<string>;
  };
  readonly description: string;
  readonly id: string;
  readonly interfaceType: NetworkInterfaceType;
  readonly name: string;
  readonly physicalAddress: string;
  readonly state: AdapterState;
  readonly statistic: {
    readonly bytesReceived: any;
    readonly bytesSent: any;
  };
  readonly supportsIpv4: boolean;
  readonly supportsIpv6: boolean;
  readonly " $fragmentType": "AdapterAddressDataFragment";
};
export type AdapterAddressDataFragment$key = {
  readonly " $data"?: AdapterAddressDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterAddressDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterAddressDataFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "supportsIpv4",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "supportsIpv6",
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
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DTO_AdapterStatistic",
      "kind": "LinkedField",
      "name": "statistic",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bytesReceived",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bytesSent",
          "storageKey": null
        }
      ],
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
          "name": "dhcpServerAddresses",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dnsAddresses",
          "storageKey": null
        },
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
          "name": "multicastAddresses",
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

(node as any).hash = "0a7b66c8e2385d253973bcaee5eaea72";

export default node;
