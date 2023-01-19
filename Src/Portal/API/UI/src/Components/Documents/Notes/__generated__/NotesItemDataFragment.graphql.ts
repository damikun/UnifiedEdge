/**
 * @generated SignedSource<<e3763080ea57b9da72f47cbbf27fe70b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotesItemDataFragment$data = {
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
  readonly " $fragmentType": "NotesItemDataFragment";
};
export type NotesItemDataFragment$key = {
  readonly " $data"?: NotesItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotesItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotesItemDataFragment",
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

(node as any).hash = "11e41b05dd17dc56122d20992965aa7e";

export default node;
