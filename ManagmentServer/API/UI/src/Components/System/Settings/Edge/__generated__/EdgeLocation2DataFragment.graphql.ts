/**
 * @generated SignedSource<<fbf48021e81d0fd145dea33428524b71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeLocation2DataFragment$data = {
  readonly id: string;
  readonly location2: string | null;
  readonly " $fragmentType": "EdgeLocation2DataFragment";
};
export type EdgeLocation2DataFragment$key = {
  readonly " $data"?: EdgeLocation2DataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeLocation2DataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeLocation2DataFragment",
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
      "name": "location2",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "02284625d993ae128021f73f099968b2";

export default node;
