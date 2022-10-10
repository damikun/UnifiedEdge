/**
 * @generated SignedSource<<e95fa134077355217e50129b622a99b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NetworkSettingsDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NetworkDefaultAdapterDataFragment">;
  readonly " $fragmentType": "NetworkSettingsDataFragment";
};
export type NetworkSettingsDataFragment$key = {
  readonly " $data"?: NetworkSettingsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NetworkSettingsDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NetworkSettingsDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NetworkDefaultAdapterDataFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "5df2c0f5381be117a21221cf1304ec5f";

export default node;
