/**
 * @generated SignedSource<<f96cad387f1de378de7f6c00c116e62d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookInfoBarDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"WebHookActivDataFragment" | "WebHookLastRunDataFragment" | "WebHookNameDataFragment">;
  readonly " $fragmentType": "WebHookInfoBarDataFragment";
};
export type WebHookInfoBarDataFragment$key = {
  readonly " $data"?: WebHookInfoBarDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookInfoBarDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookInfoBarDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WebHookNameDataFragment"
    },
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

(node as any).hash = "9713caa5dc30d875870a840c3e11439a";

export default node;
