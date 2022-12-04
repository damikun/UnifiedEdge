/**
 * @generated SignedSource<<d595092f26c9b3ee1c05dbc1c91407b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthClientItemDataFragment$data = {
  readonly clientId: string | null;
  readonly enabled: boolean;
  readonly id: string;
  readonly lastAuthenticate: any | null;
  readonly " $fragmentType": "MqttAuthClientItemDataFragment";
};
export type MqttAuthClientItemDataFragment$key = {
  readonly " $data"?: MqttAuthClientItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttAuthClientItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clientId",
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
  "type": "GQL_MqttAuthClient",
  "abstractKey": null
};

(node as any).hash = "c318647000f472becfb8cffc8bae5903";

export default node;
