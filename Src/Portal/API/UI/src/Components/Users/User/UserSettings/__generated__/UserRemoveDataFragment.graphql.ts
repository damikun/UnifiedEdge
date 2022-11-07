/**
 * @generated SignedSource<<94c4184bf2e9d9971f09fc229e3b7e52>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserRemoveDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "UserRemoveDataFragment";
};
export type UserRemoveDataFragment$key = {
  readonly " $data"?: UserRemoveDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserRemoveDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRemoveDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "94131a283ce59d7e0896271bb1c51372";

export default node;
