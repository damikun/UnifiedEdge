/**
 * @generated SignedSource<<fa94d5634a277f81aa53e87038f094ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoConfigDataFragment$data = {
  readonly isConfigMatch: boolean | null;
  readonly " $fragmentType": "ServerInfoConfigDataFragment";
};
export type ServerInfoConfigDataFragment$key = {
  readonly " $data"?: ServerInfoConfigDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoConfigDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoConfigDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isConfigMatch",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "5d95c71b1482846140c60e69a8720570";

export default node;
