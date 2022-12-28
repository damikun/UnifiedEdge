/**
 * @generated SignedSource<<7613338224e8d1ff16f98ba218ae8762>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EdgeMetricsData$data = {
  readonly id: string;
  readonly name: string;
  readonly timeStamp: string;
  readonly value: any | null;
  readonly " $fragmentType": "EdgeMetricsData";
};
export type EdgeMetricsData$key = {
  readonly " $data"?: EdgeMetricsData$data;
  readonly " $fragmentSpreads": FragmentRefs<"EdgeMetricsData">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EdgeMetricsData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeStamp",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "value",
      "storageKey": null
    }
  ],
  "type": "GQL_Metric",
  "abstractKey": null
};

(node as any).hash = "a6b31bf5d21dca0890440ef1dde4c3bd";

export default node;
