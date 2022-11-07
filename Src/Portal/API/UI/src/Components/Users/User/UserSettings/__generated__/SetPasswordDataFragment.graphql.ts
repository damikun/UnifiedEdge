/**
 * @generated SignedSource<<5811c49f80aac663e0af4245686fa99a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetPasswordDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "SetPasswordDataFragment";
};
export type SetPasswordDataFragment$key = {
  readonly " $data"?: SetPasswordDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SetPasswordDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SetPasswordDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "34a1211f4a5276a5a2ce56f5f89da597";

export default node;
