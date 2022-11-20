/**
 * @generated SignedSource<<d49febdb3be434554941ec6c5be6d7cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttClientStateDataFragment$data = {
  readonly isConnected: boolean;
  readonly " $fragmentType": "MqttClientStateDataFragment";
};
export type MqttClientStateDataFragment$key = {
  readonly " $data"?: MqttClientStateDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientStateDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttClientStateDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isConnected",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttClient",
  "abstractKey": null
};

(node as any).hash = "971d49b18869c59d645d3b86b129db78";

export default node;
