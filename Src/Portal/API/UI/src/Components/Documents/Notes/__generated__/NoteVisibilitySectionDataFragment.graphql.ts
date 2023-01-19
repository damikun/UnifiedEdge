/**
 * @generated SignedSource<<2e197c084e4fe197d640a0344482aa44>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteVisibilitySectionDataFragment$data = {
  readonly id: string;
  readonly isPrivate: boolean;
  readonly " $fragmentType": "NoteVisibilitySectionDataFragment";
};
export type NoteVisibilitySectionDataFragment$key = {
  readonly " $data"?: NoteVisibilitySectionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoteVisibilitySectionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoteVisibilitySectionDataFragment",
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
      "name": "isPrivate",
      "storageKey": null
    }
  ],
  "type": "GQL_Note",
  "abstractKey": null
};

(node as any).hash = "4dd1f791bb10fae55302bb7d373ffbc8";

export default node;
