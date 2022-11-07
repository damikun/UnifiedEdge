/**
 * @generated SignedSource<<1957932d1107b1b84bfdd0098ffe7503>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookUrlSettingDataFragment$data = {
  readonly id: string;
  readonly webHookUrl: string;
  readonly " $fragmentType": "WebHookUrlSettingDataFragment";
};
export type WebHookUrlSettingDataFragment$key = {
  readonly " $data"?: WebHookUrlSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookUrlSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookUrlSettingDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "webHookUrl",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "5b0f6a47d47139af589134483376edd8";

export default node;
