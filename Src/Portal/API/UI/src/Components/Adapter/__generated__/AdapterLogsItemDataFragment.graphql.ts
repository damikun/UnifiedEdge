/**
 * @generated SignedSource<<fda8a25576370d780b2336b7bee81936>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AdapterState = "DOWN" | "UNKNOWN" | "UP" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdapterLogsItemDataFragment$data = {
  readonly id: string;
  readonly state: AdapterState;
  readonly timeStamp: any;
  readonly " $fragmentType": "AdapterLogsItemDataFragment";
};
export type AdapterLogsItemDataFragment$key = {
  readonly " $data"?: AdapterLogsItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterLogsItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterLogsItemDataFragment",
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
      "name": "timeStamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "GQL_AdapterLog",
  "abstractKey": null
};

(node as any).hash = "093ac3a916b53336f984ad53e4c53156";

export default node;
