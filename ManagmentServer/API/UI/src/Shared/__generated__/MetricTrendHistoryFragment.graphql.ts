/**
 * @generated SignedSource<<a32b10a60ac76ecb09ae9036dfae8760>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetricTrendHistoryFragment$data = {
  readonly metricHistory: ReadonlyArray<{
    readonly timeStamp: any | null;
    readonly value: any | null;
  } | null> | null;
  readonly " $fragmentType": "MetricTrendHistoryFragment";
};
export type MetricTrendHistoryFragment$key = {
  readonly " $data"?: MetricTrendHistoryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MetricTrendHistoryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MetricTrendHistoryFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "name",
          "variableName": "type"
        }
      ],
      "concreteType": "HistorianRecord",
      "kind": "LinkedField",
      "name": "metricHistory",
      "plural": true,
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
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_RuntimeMetrics",
  "abstractKey": null
};

(node as any).hash = "b70892bd4609842b1ee2718962372156";

export default node;
