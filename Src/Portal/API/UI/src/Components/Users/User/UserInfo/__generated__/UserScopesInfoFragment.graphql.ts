/**
 * @generated SignedSource<<3d2e183cf6661a1974a2dff66a68becd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserScopesInfoFragment$data = {
  readonly userClaims: ReadonlyArray<{
    readonly type: string | null;
    readonly value: string | null;
  }>;
  readonly " $fragmentType": "UserScopesInfoFragment";
};
export type UserScopesInfoFragment$key = {
  readonly " $data"?: UserScopesInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserScopesInfoFragment">;
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
  "name": "UserScopesInfoFragment",
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
      "concreteType": "GQL_Claim",
      "kind": "LinkedField",
      "name": "userClaims",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "bd0a811a6919972b247efd28b79d8ad9";

export default node;
