/**
 * @generated SignedSource<<8a6282aff488ba9af6d2a72191c9c199>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserClaimsInfoFragment$data = {
  readonly userClaims: ReadonlyArray<{
    readonly type: string | null;
    readonly value: string | null;
  }>;
  readonly " $fragmentType": "UserClaimsInfoFragment";
};
export type UserClaimsInfoFragment$key = {
  readonly " $data"?: UserClaimsInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserClaimsInfoFragment">;
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
  "name": "UserClaimsInfoFragment",
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

(node as any).hash = "8448ae48e4d29e1633127bfd15a6e571";

export default node;
