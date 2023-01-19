/**
 * @generated SignedSource<<acfcf449f08018433e9df6e54df7410a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteDataFragment$data = {
  readonly content: string | null;
  readonly id: string;
  readonly isHighlighted: boolean;
  readonly isPrivate: boolean;
  readonly name: string | null;
  readonly updated: string;
  readonly updatedby: {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly userName: string | null;
  } | null;
  readonly " $fragmentType": "NoteDataFragment";
};
export type NoteDataFragment$key = {
  readonly " $data"?: NoteDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoteDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoteDataFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isHighlighted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isPrivate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updated",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_User",
      "kind": "LinkedField",
      "name": "updatedby",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_Note",
  "abstractKey": null
};

(node as any).hash = "06f771e2d8556ca6807bd3221332c464";

export default node;
