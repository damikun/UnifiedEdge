/**
 * @generated SignedSource<<aad7fc2ea70e34a373f714c9e2255a9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerSharedInfoFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ServerSharedInfoFragment";
};
export type ServerSharedInfoFragment$key = {
  readonly " $data"?: ServerSharedInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerSharedInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerSharedInfoFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "15d94d8c5cf1bc46bac7d7f62b5ece5b";

export default node;
