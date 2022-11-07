/**
 * @generated SignedSource<<a5b7ce7e01c9146f031b16b96304f901>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerRemoveDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ServerRemoveDataFragment";
};
export type ServerRemoveDataFragment$key = {
  readonly " $data"?: ServerRemoveDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerRemoveDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerRemoveDataFragment",
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

(node as any).hash = "445852a4a4b41071e0938e62e8c0f705";

export default node;
