/**
 * @generated SignedSource<<dc0227bcde4caf896e0a925b258bde10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PlatformID = "MAC_OSX" | "OTHER" | "UNIX" | "WIN32_NT" | "WIN32_S" | "WIN32_WINDOWS" | "WIN_CE" | "XBOX" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type EdgeInfoDataFragment$data = {
  readonly edgeInfo: {
    readonly guid: string;
    readonly id: string;
    readonly name: string;
  };
  readonly systemInfo: {
    readonly osVersion: {
      readonly platform: PlatformID;
      readonly version: string | null;
    } | null;
    readonly serverDateTime: string;
    readonly targetFramework: string | null;
    readonly uptime: {
      readonly days: number;
      readonly hours: number;
      readonly minutes: number;
    } | null;
  };
  readonly " $fragmentType": "EdgeInfoDataFragment";
};
export type EdgeInfoDataFragment$key = {
  readonly " $data"?: EdgeInfoDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeInfoDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeInfoDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_SystemInfo",
      "kind": "LinkedField",
      "name": "systemInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "serverDateTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "targetFramework",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_OS",
          "kind": "LinkedField",
          "name": "osVersion",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "platform",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "version",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_Uptime",
          "kind": "LinkedField",
          "name": "uptime",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "days",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hours",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "minutes",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_Edge",
      "kind": "LinkedField",
      "name": "edgeInfo",
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
          "name": "guid",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "41f87c510ee6df03e5dded61ab20a7bf";

export default node;
