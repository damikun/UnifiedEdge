/**
 * @generated SignedSource<<319b83f9b3b4e5b08dfe8e72471cb09c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_ServerState = "RESTARTING" | "RUNNING" | "STARTING" | "STOPPED" | "STOPPING" | "UNKNOWN" | "%future added value";
export type GQL_ServerVariant = "MQTT" | "OPC" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServerListItemDataFragment$data = {
  readonly __typename: string;
  readonly id: string;
  readonly name: string;
  readonly state: GQL_ServerState;
  readonly type: GQL_ServerVariant;
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
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "388b0153ae8248b49ba46cb2897cb507";

export default node;
