/**
 * @generated SignedSource<<054b3a956c6a8ef16213f1b366ceaa07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerClientPresistSessionDataFragment$data = {
  readonly id: string;
  readonly presistentSession: boolean;
  readonly serverUID: string;
  readonly " $fragmentType": "MqttServerClientPresistSessionDataFragment";
};
export type MqttServerClientPresistSessionDataFragment$key = {
  readonly " $data"?: MqttServerClientPresistSessionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientPresistSessionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttServerClientPresistSessionDataFragment",
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
      "name": "serverUID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "presistentSession",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerClientCfg",
  "abstractKey": null
};

(node as any).hash = "6ea46f33a9841eb1ee7dd1a68cda3af8";

export default node;
