/**
 * @generated SignedSource<<defbe8530e4f12ffa572f241054bd937>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerSharedSettingsFragment$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ServerDescriptionDataFragment" | "ServerLocationDataFragment" | "ServerNameDataFragment">;
  readonly " $fragmentType": "ServerSharedSettingsFragment";
};
export type ServerSharedSettingsFragment$key = {
  readonly " $data"?: ServerSharedSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerSharedSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerSharedSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerNameDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerLocationDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerDescriptionDataFragment"
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "e38550c846d2e4eb43574f3093fd5dfb";

export default node;
