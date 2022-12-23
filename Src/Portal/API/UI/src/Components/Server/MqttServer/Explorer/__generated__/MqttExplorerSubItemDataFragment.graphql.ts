/**
 * @generated SignedSource<<0db420aad0c8232308f7e0fc71086c6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerSubItemDataFragment$data = {
  readonly id: string;
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
    }
  ],
  "type": "GQL_MqttExplorerSub",
  "abstractKey": null
};

(node as any).hash = "3b1696b57cd4d56cefe70b437796c2ab";

export default node;
