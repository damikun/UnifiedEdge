/**
 * @generated SignedSource<<2f49409f8fbe82d9fc0e98e029438252>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type WebHookGeneralInfoFragment$data = {
  readonly eventGroup: ReadonlyArray<HookEventGroup>;
  readonly id: string;
  readonly uid: string;
  readonly webHookUrl: string;
  readonly " $fragmentType": "WebHookGeneralInfoFragment";
};
export type WebHookGeneralInfoFragment$key = {
  readonly " $data"?: WebHookGeneralInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookGeneralInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookGeneralInfoFragment",
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
      "name": "uid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "webHookUrl",
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

(node as any).hash = "09064f9e0b8faa1337e5bdf8c6f7c9ad";

export default node;
