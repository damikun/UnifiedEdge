/**
 * @generated SignedSource<<6832a389e356e985b87de42865550f3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookLastRunDataFragment$data = {
  readonly lastTrigger: any | null;
  readonly " $fragmentType": "WebHookLastRunDataFragment";
};
export type WebHookLastRunDataFragment$key = {
  readonly " $data"?: WebHookLastRunDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookLastRunDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookLastRunDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastTrigger",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "4dc9407860d6bb6478fce9c34d8e062f";

export default node;
