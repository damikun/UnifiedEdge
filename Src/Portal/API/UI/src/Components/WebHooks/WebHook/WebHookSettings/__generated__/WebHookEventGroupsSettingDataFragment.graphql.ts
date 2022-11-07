/**
 * @generated SignedSource<<612d4bda8973744a8e62dd067a0b5a37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type WebHookEventGroupsSettingDataFragment$data = {
  readonly eventGroup: ReadonlyArray<HookEventGroup>;
  readonly id: string;
  readonly " $fragmentType": "WebHookEventGroupsSettingDataFragment";
};
export type WebHookEventGroupsSettingDataFragment$key = {
  readonly " $data"?: WebHookEventGroupsSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookEventGroupsSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookEventGroupsSettingDataFragment",
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
      "name": "eventGroup",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "849fe38d271f1e349ef4e0d2da7e9811";

export default node;
