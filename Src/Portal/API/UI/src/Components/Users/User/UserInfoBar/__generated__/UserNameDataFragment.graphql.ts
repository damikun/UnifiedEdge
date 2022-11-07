/**
 * @generated SignedSource<<a39b1c5b2f85ba3cf46edd151f754873>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserNameDataFragment$data = {
  readonly userName: string | null;
  readonly " $fragmentType": "UserNameDataFragment";
};
export type UserNameDataFragment$key = {
  readonly " $data"?: UserNameDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserNameDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserNameDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userName",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "91b96988e2e4ea23397b890a28a9042a";

export default node;
