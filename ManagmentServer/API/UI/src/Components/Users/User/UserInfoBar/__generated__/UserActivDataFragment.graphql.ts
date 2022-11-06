/**
 * @generated SignedSource<<6b5372a9b3f15a72f0881799fdbdc7a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserActivDataFragment$data = {
  readonly enabled: boolean;
  readonly " $fragmentType": "UserActivDataFragment";
};
export type UserActivDataFragment$key = {
  readonly " $data"?: UserActivDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserActivDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserActivDataFragment",
  "selections": [
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

(node as any).hash = "4bc30387d3a62a28ab8b5c4a157c6045";

export default node;
