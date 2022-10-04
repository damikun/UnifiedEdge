/**
 * @generated SignedSource<<4167444d08e147aed058d15d49007ba1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeLocation3DataFragment$data = {
  readonly id: string;
  readonly location3: string | null;
  readonly " $fragmentType": "EdgeLocation3DataFragment";
};
export type EdgeLocation3DataFragment$key = {
  readonly " $data"?: EdgeLocation3DataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeLocation3DataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeLocation3DataFragment",
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
      "name": "location3",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "7bb98b849bbb520e1135c8e01b1bb117";

export default node;
