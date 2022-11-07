/**
 * @generated SignedSource<<7da46289eaa92fcc5c402e6298da022b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookNameSettingDataFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "WebHookNameSettingDataFragment";
};
export type WebHookNameSettingDataFragment$key = {
  readonly " $data"?: WebHookNameSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookNameSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookNameSettingDataFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "40016561efaebd6371cca9468ef02f4e";

export default node;
