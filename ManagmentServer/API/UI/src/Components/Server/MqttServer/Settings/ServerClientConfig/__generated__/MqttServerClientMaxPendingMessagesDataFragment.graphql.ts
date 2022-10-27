/**
 * @generated SignedSource<<2a20d8d2a4b302c59514da6a43f0450d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerClientMaxPendingMessagesDataFragment$data = {
  readonly id: string;
  readonly maxPendingMessagesPerClient: number;
  readonly serverUID: string;
  readonly " $fragmentType": "MqttServerClientMaxPendingMessagesDataFragment";
};
export type MqttServerClientMaxPendingMessagesDataFragment$key = {
  readonly " $data"?: MqttServerClientMaxPendingMessagesDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientMaxPendingMessagesDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttServerClientMaxPendingMessagesDataFragment",
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
      "name": "maxPendingMessagesPerClient",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerClientCfg",
  "abstractKey": null
};

(node as any).hash = "43299c536405fd3e4971842abfd3eaf3";

export default node;
