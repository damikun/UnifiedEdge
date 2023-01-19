/**
 * @generated SignedSource<<55305d498aec7e76f9eb07ac6f55b1ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteUpdateSectionDataFragment$data = {
  readonly content: string | null;
  readonly id: string;
  readonly " $fragmentType": "NoteUpdateSectionDataFragment";
};
export type NoteUpdateSectionDataFragment$key = {
  readonly " $data"?: NoteUpdateSectionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoteUpdateSectionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoteUpdateSectionDataFragment",
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
      "name": "content",
      "storageKey": null
    }
  ],
  "type": "GQL_Note",
  "abstractKey": null
};

(node as any).hash = "edcc827c95d26b66035f051d5f4daae0";

export default node;
