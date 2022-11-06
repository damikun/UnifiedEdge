/**
 * @generated SignedSource<<8b8edfd32a6da4523cfe7b16d88a682a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserFirstNameSettingDataFragment$data = {
  readonly firstName: string | null;
  readonly id: string;
  readonly " $fragmentType": "UserFirstNameSettingDataFragment";
};
export type UserFirstNameSettingDataFragment$key = {
  readonly " $data"?: UserFirstNameSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserFirstNameSettingDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserFirstNameSettingDataFragment",
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
      "name": "firstName",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "2f928852abb57d177cf90410fd06552c";

export default node;
