/**
 * @generated SignedSource<<85169829f9efe9a98003c223e06d8b7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookInfoDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WebHookActivDataFragment" | "WebHookLastRunDataFragment">;
  readonly " $fragmentType": "WebHookInfoDataFragment";
};
export type WebHookInfoDataFragment$key = {
  readonly " $data"?: WebHookInfoDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookInfoDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookInfoDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WebHookLastRunDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WebHookActivDataFragment"
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "6d33790b940b91419fae4e4ea5825a71";

export default node;
