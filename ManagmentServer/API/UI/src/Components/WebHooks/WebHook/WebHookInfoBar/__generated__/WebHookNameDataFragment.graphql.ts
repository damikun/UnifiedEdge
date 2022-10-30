/**
 * @generated SignedSource<<84755f2911b26ad8aa0fdc165376f2d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookNameDataFragment$data = {
  readonly name: string;
  readonly " $fragmentType": "WebHookNameDataFragment";
};
export type WebHookNameDataFragment$key = {
  readonly " $data"?: WebHookNameDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookNameDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookNameDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "8b423f38fbed4a12bb0eb902da0f605c";

export default node;
