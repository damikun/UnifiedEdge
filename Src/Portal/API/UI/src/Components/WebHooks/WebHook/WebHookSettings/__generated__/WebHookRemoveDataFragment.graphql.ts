/**
 * @generated SignedSource<<d3386e122b30fa1405d5979e8b7f1905>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookRemoveDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "WebHookRemoveDataFragment";
};
export type WebHookRemoveDataFragment$key = {
  readonly " $data"?: WebHookRemoveDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookRemoveDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookRemoveDataFragment",
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

(node as any).hash = "369ad751a08bb1bbd5bf8633202fbe30";

export default node;
