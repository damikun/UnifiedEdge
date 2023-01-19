/**
 * @generated SignedSource<<c496fe1c3a31f841afaf1a7f23e7b5b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteNameSectionDataFragment$data = {
  readonly id: string;
  readonly name: string | null;
  readonly " $fragmentType": "NoteNameSectionDataFragment";
};
export type NoteNameSectionDataFragment$key = {
  readonly " $data"?: NoteNameSectionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoteNameSectionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoteNameSectionDataFragment",
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
  "type": "GQL_Note",
  "abstractKey": null
};

(node as any).hash = "dd179f9b1097582a11c1293157b35479";

export default node;
