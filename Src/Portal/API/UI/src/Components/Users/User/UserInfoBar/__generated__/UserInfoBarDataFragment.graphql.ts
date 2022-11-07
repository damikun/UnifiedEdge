/**
 * @generated SignedSource<<4e84e0edeb56e8764f03b4735d1904f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserInfoBarDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserActivDataFragment" | "UserNameDataFragment">;
  readonly " $fragmentType": "UserInfoBarDataFragment";
};
export type UserInfoBarDataFragment$key = {
  readonly " $data"?: UserInfoBarDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserInfoBarDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserInfoBarDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserNameDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserActivDataFragment"
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "6f8fe939fe18b985de85852869dd09f0";

export default node;
