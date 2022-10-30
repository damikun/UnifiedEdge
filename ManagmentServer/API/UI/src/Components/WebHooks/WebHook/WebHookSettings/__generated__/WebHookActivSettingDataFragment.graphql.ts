/**
 * @generated SignedSource<<eb6438f0b02f8762af4e5cc04b828474>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookActivSettingDataFragment$data = {
  readonly id: string;
  readonly isActive: boolean;
  readonly " $fragmentType": "WebHookActivSettingDataFragment";
};
export type WebHookActivSettingDataFragment$key = {
  readonly " $data"?: WebHookActivSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookActivSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookActivSettingDataFragment",
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
      "name": "isActive",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "755810acdc3086b0d02ac82717601d3f";

export default node;
