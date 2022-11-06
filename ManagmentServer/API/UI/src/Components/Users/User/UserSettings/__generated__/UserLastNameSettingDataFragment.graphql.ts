/**
 * @generated SignedSource<<2f0e224316a2d737943931a812f90e1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserLastNameSettingDataFragment$data = {
  readonly id: string;
  readonly lastName: string | null;
  readonly " $fragmentType": "UserLastNameSettingDataFragment";
};
export type UserLastNameSettingDataFragment$key = {
  readonly " $data"?: UserLastNameSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserLastNameSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserLastNameSettingDataFragment",
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
      "name": "lastName",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "32a4c39c749a5aae324c59d4c69e2421";

export default node;
