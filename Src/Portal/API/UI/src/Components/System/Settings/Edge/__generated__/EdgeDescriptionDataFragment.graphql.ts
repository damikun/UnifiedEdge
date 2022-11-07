/**
 * @generated SignedSource<<7ea3b3241fd23a4d3c5d5e7a3ce4edb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeDescriptionDataFragment$data = {
  readonly description: string | null;
  readonly id: string;
  readonly " $fragmentType": "EdgeDescriptionDataFragment";
};
export type EdgeDescriptionDataFragment$key = {
  readonly " $data"?: EdgeDescriptionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeDescriptionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeDescriptionDataFragment",
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "3633081004e85a58858adc079622b581";

export default node;
