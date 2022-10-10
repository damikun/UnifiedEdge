/**
 * @generated SignedSource<<0d608db8d25b2934f5a54d427b5ce40f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_MqttProtocol = "UNKNOWN" | "V310" | "V311" | "V500" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttClientItemDataFragment$data = {
  readonly connectedAt: any | null;
  readonly id: string;
  readonly protocol: GQL_MqttProtocol;
  readonly rawId: string | null;
  readonly serverUid: string;
  readonly " $fragmentType": "MqttClientItemDataFragment";
};
export type MqttClientItemDataFragment$key = {
  readonly " $data"?: MqttClientItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttClientItemDataFragment",
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
      "name": "rawId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "protocol",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serverUid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "connectedAt",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttClient",
  "abstractKey": null
};

(node as any).hash = "cdeb7eb23c24beeab55012aba1b1a030";

export default node;
