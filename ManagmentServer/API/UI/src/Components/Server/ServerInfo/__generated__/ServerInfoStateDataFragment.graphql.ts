/**
 * @generated SignedSource<<a93fba6139c53b7d1d5cac989298d182>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_ServerState = "RESTARTING" | "RUNNING" | "STARTING" | "STOPPED" | "STOPPING" | "UNKNOWN" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServerInfoStateDataFragment$data = {
  readonly state: GQL_ServerState;
  readonly " $fragmentType": "ServerInfoStateDataFragment";
};
export type ServerInfoStateDataFragment$key = {
  readonly " $data"?: ServerInfoStateDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoStateDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoStateDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "a1053425add1c1aad81a906eb78da3c1";

export default node;
