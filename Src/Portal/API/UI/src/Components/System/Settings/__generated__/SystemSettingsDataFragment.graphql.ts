/**
 * @generated SignedSource<<c32262fbac832ccebdb79715cd17dda7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SystemSettingsDataFragment$data = {
  readonly edgeInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"EdgeDescriptionDataFragment" | "EdgeLocation1DataFragment" | "EdgeLocation2DataFragment" | "EdgeLocation3DataFragment" | "EdgeNameDataFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"NetworkSettingsDataFragment">;
  readonly " $fragmentType": "SystemSettingsDataFragment";
};
export type SystemSettingsDataFragment$key = {
  readonly " $data"?: SystemSettingsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemSettingsDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SystemSettingsDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_Edge",
      "kind": "LinkedField",
      "name": "edgeInfo",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EdgeNameDataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EdgeDescriptionDataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EdgeLocation1DataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EdgeLocation2DataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EdgeLocation3DataFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NetworkSettingsDataFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "ee53cb9c5bd533c2df88164eed2b2e8d";

export default node;
