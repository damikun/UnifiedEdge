/**
 * @generated SignedSource<<81f201b6dbad6bb79fface6ac56648c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserRolesInfoFragment$data = {
  readonly userRoles: ReadonlyArray<string>;
  readonly " $fragmentType": "UserRolesInfoFragment";
};
export type UserRolesInfoFragment$key = {
  readonly " $data"?: UserRolesInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserRolesInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "user_id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRolesInfoFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "user_id",
          "variableName": "user_id"
        }
      ],
      "kind": "ScalarField",
      "name": "userRoles",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "855b8bea03daf633c76e86bd269aa391";

export default node;
