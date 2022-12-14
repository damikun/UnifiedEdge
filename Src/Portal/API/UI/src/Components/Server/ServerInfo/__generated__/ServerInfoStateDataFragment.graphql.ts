/**
 * @generated SignedSource<<a3d7649dd669feba69d24dffc84d46c3>>
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
  readonly id: string;
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
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "d3c161c9b871e4a3e519cfccbb1fa8fa";

export default node;
