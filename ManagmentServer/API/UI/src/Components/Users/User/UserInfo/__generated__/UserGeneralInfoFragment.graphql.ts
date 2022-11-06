/**
 * @generated SignedSource<<7f0c32aa92684a01556f820d0d6d8e4a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserGeneralInfoFragment$data = {
  readonly firstName: string | null;
  readonly id: string;
  readonly lastName: string | null;
  readonly userName: string | null;
  readonly " $fragmentType": "UserGeneralInfoFragment";
};
export type UserGeneralInfoFragment$key = {
  readonly " $data"?: UserGeneralInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserGeneralInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserGeneralInfoFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userName",
      "storageKey": null
    }
  ],
  "type": "GQL_User",
  "abstractKey": null
};

(node as any).hash = "eaf36704b16838fe489aeb8bba5620a7";

export default node;
