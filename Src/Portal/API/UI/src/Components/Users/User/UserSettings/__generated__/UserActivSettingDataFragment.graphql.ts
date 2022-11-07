/**
 * @generated SignedSource<<8750af437d8795a367ac7dd9487d5c45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserActivSettingDataFragment$data = {
  readonly enabled: boolean;
  readonly id: string;
  readonly " $fragmentType": "UserActivSettingDataFragment";
};
export type UserActivSettingDataFragment$key = {
  readonly " $data"?: UserActivSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserActivSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserActivSettingDataFragment",
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
      "name": "enabled",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "20f6c0f3b838652d72d71045767b0c72";

export default node;
