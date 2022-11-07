/**
 * @generated SignedSource<<5565f2eba63577e54e09fdc6c483af15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeNameDataFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "EdgeNameDataFragment";
};
export type EdgeNameDataFragment$key = {
  readonly " $data"?: EdgeNameDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeNameDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeNameDataFragment",
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
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "7cc4dc46783a6b43883d183be8952e7d";

export default node;
