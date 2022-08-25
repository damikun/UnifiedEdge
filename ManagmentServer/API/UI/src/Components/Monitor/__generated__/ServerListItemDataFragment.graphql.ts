/**
 * @generated SignedSource<<378d904e7e4acbac66028f2014bd1a35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttState = "RESTARTING" | "RUNNING" | "STARTING" | "STOPPED" | "STOPPING" | "UNKNOWN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServerListItemDataFragment$data = {
  readonly id: string;
  readonly isRunning: boolean;
  readonly name: string;
  readonly port: number;
  readonly state: MqttState;
  readonly " $fragmentType": "ServerListItemDataFragment";
};
export type ServerListItemDataFragment$key = {
  readonly " $data"?: ServerListItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerListItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerListItemDataFragment",
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
      "name": "isRunning",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "port",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServer",
  "abstractKey": null
};

(node as any).hash = "f5fdf1ebe759549cc44c59b4310d11bb";

export default node;
