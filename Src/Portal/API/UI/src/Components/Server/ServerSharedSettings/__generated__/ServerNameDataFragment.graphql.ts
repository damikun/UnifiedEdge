/**
 * @generated SignedSource<<8e91b000463de3a03e3e64bc51cdfb00>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerNameDataFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ServerNameDataFragment";
};
export type ServerNameDataFragment$key = {
  readonly " $data"?: ServerNameDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerNameDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerNameDataFragment",
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
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "c025950487bdcbd03aa899e2d6c5b23d";

export default node;
