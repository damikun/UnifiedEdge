/**
 * @generated SignedSource<<cdaaf595ffbf4c8fdc6e7a8c7b5695a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AdapterState = "DOWN" | "UNKNOWN" | "UP" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdapterStateDataFragment$data = {
  readonly state: AdapterState;
  readonly " $fragmentType": "AdapterStateDataFragment";
};
export type AdapterStateDataFragment$key = {
  readonly " $data"?: AdapterStateDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterStateDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterStateDataFragment",
  "selections": [
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

(node as any).hash = "2184f070d4ee7055c95db0b38d80b8b7";

export default node;
