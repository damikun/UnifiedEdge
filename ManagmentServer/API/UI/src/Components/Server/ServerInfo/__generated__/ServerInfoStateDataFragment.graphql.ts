/**
 * @generated SignedSource<<7f25ddd017f4cecb6f71629f1a07530b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_ServerState = "DISABLED" | "RESTARTING" | "STARTED" | "STARTING" | "STOPPED" | "STOPPING" | "UNDEFINED" | "%future added value";
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
