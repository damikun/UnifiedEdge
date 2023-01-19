/**
 * @generated SignedSource<<742bda40d49d9c834552d24db75769d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteHighlightSectionDataFragment$data = {
  readonly id: string;
  readonly isHighlighted: boolean;
  readonly " $fragmentType": "NoteHighlightSectionDataFragment";
};
export type NoteHighlightSectionDataFragment$key = {
  readonly " $data"?: NoteHighlightSectionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoteHighlightSectionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoteHighlightSectionDataFragment",
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
      "name": "isHighlighted",
      "storageKey": null
    }
  ],
  "type": "GQL_Note",
  "abstractKey": null
};

(node as any).hash = "d2459a7ef0b1df852c5e7d23039d4cfb";

export default node;
