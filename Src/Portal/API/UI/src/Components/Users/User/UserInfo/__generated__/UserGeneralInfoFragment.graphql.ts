/**
 * @generated SignedSource<<f95e9090175a8572a423f793d855e58a>>
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
  readonly sub: string;
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
      "name": "sub",
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

(node as any).hash = "1783c734c9273353d24ecfb88a5d4259";

export default node;
