/**
 * @generated SignedSource<<90911aae3b43d4282043a4365985b07a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthUserItemDataFragment$data = {
  readonly enabled: boolean;
  readonly id: string;
  readonly lastAuthenticate: string | null;
  readonly userName: string | null;
  readonly " $fragmentType": "MqttAuthUserItemDataFragment";
};
export type MqttAuthUserItemDataFragment$key = {
  readonly " $data"?: MqttAuthUserItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthUserItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttAuthUserItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "enabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastAuthenticate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttAuthUser",
  "abstractKey": null
};

(node as any).hash = "400bbe6a8d3c0fde2937d60ad6630a67";

export default node;
