/**
 * @generated SignedSource<<132a64b9c7e0d8bee8f1b345a9e248e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookActivDataFragment$data = {
  readonly isActive: boolean;
  readonly " $fragmentType": "WebHookActivDataFragment";
};
export type WebHookActivDataFragment$key = {
  readonly " $data"?: WebHookActivDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookActivDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookActivDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "36c606b1056ad4fe61e5785ffe48ea46";

export default node;
