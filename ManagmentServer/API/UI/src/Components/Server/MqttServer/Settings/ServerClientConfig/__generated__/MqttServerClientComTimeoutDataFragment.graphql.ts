/**
 * @generated SignedSource<<6a8fac828982e2054f3f2189919b1493>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerClientComTimeoutDataFragment$data = {
  readonly communicationTimeout: number;
  readonly id: string;
  readonly serverUID: string;
  readonly " $fragmentType": "MqttServerClientComTimeoutDataFragment";
};
export type MqttServerClientComTimeoutDataFragment$key = {
  readonly " $data"?: MqttServerClientComTimeoutDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientComTimeoutDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttServerClientComTimeoutDataFragment",
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
      "name": "communicationTimeout",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerClientCfg",
  "abstractKey": null
};

(node as any).hash = "51963f7c79fbe3a74928234a0e36923c";

export default node;
