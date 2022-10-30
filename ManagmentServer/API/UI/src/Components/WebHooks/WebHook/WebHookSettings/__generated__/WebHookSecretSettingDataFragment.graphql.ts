/**
 * @generated SignedSource<<455d74f25ce30e46e1f62bd9064a8b27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookSecretSettingDataFragment$data = {
  readonly id: string;
  readonly secret: string | null;
  readonly " $fragmentType": "WebHookSecretSettingDataFragment";
};
export type WebHookSecretSettingDataFragment$key = {
  readonly " $data"?: WebHookSecretSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookSecretSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookSecretSettingDataFragment",
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
      "name": "secret",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "cb12a6e27148160d2208db34db336837";

export default node;
