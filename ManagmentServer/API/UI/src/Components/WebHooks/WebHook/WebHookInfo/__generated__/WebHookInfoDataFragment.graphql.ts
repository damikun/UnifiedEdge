/**
 * @generated SignedSource<<babdaff778ccb8eea050cd861522014f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookInfoDataFragment$data = {
  readonly id: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "cb2fc8734e4f373677e7c7b2131b6991";

export default node;
