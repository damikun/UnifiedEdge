/**
 * @generated SignedSource<<54397b43be4d2c954b28b3e1ef955611>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerLocationDataFragment$data = {
  readonly id: string;
  readonly location: string | null;
  readonly " $fragmentType": "ServerLocationDataFragment";
};
export type ServerLocationDataFragment$key = {
  readonly " $data"?: ServerLocationDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerLocationDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerLocationDataFragment",
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
      "name": "location",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "4c4eb7dbf0fad6f92fee836c7b3f5e9d";

export default node;
