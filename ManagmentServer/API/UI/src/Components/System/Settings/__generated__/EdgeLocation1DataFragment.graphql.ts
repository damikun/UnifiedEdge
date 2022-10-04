/**
 * @generated SignedSource<<abc6b4d6d41d45b67376dad259cad17d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeLocation1DataFragment$data = {
  readonly id: string;
  readonly location1: string | null;
  readonly " $fragmentType": "EdgeLocation1DataFragment";
};
export type EdgeLocation1DataFragment$key = {
  readonly " $data"?: EdgeLocation1DataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeLocation1DataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeLocation1DataFragment",
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
      "name": "location1",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "77ad7b4913bb302bc7db4bd9e4828730";

export default node;
