/**
 * @generated SignedSource<<d17722637400bc8d5718070da984c6a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerSubItemDataFragment$data = {
  readonly color: string | null;
  readonly id: string;
  readonly serverUid: string | null;
  readonly topic: string | null;
  readonly " $fragmentType": "MqttExplorerSubItemDataFragment";
};
export type MqttExplorerSubItemDataFragment$key = {
  readonly " $data"?: MqttExplorerSubItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerSubItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttExplorerSubItemDataFragment",
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
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "color",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serverUid",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttExplorerSub",
  "abstractKey": null
};

(node as any).hash = "ff3a225db1b94c359201bf78ac76b52e";

export default node;
