/**
 * @generated SignedSource<<fb5017f89c45cf71c92cf9fadd14413c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoNameDataFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "ServerInfoNameDataFragment";
};
export type ServerInfoNameDataFragment$key = {
  readonly " $data"?: ServerInfoNameDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoNameDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoNameDataFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "717673fb4dc882b1e3ee43bbd1192098";

export default node;
