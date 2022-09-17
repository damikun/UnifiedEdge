/**
 * @generated SignedSource<<ab19e36ac6fb14a7b99cfabf8c8ecbc8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoNameDataFragment$data = {
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "34696ede1f68dfbf30432a028b4259b1";

export default node;
