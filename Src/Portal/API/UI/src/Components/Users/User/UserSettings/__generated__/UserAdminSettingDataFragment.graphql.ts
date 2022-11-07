/**
 * @generated SignedSource<<7a0aa91e756a9e584430acdf5d5582ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserAdminSettingDataFragment$data = {
  readonly user: {
    readonly isAdmin: boolean;
  };
  readonly userById: {
    readonly id: string;
  };
  readonly " $fragmentType": "UserAdminSettingDataFragment";
};
export type UserAdminSettingDataFragment$key = {
  readonly " $data"?: UserAdminSettingDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserAdminSettingDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "user_id",
    "variableName": "user_id"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "user_id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserAdminSettingDataFragment",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "GQL_User",
      "kind": "LinkedField",
      "name": "userById",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "user",
      "args": (v0/*: any*/),
      "concreteType": "IsAdminResult",
      "kind": "LinkedField",
      "name": "isAdmin",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAdmin",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "1e4770f573644804577e252eeb7c984b";

export default node;
