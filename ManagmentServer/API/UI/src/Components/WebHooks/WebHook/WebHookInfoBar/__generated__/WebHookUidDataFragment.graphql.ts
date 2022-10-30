/**
 * @generated SignedSource<<11370b5d7b4e7ce8be8f1c87a9a5fcee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookUidDataFragment$data = {
  readonly uid: string;
  readonly " $fragmentType": "WebHookUidDataFragment";
};
export type WebHookUidDataFragment$key = {
  readonly " $data"?: WebHookUidDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookUidDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookUidDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uid",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "5c899e287000865bd32633eae4aa242b";

export default node;
