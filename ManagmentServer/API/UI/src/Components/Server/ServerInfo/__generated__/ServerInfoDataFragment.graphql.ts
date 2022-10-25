/**
 * @generated SignedSource<<5b9400a0a0a4002c910190c8a60344d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoConfigDataFragment" | "ServerInfoNameDataFragment" | "ServerInfoStateDataFragment" | "ServerInfoUptimeDataFragment">;
  readonly " $fragmentType": "ServerInfoDataFragment";
};
export type ServerInfoDataFragment$key = {
  readonly " $data"?: ServerInfoDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoDataFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerInfoNameDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerInfoStateDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerInfoUptimeDataFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ServerInfoConfigDataFragment"
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "560e38fcd68f01ea791e010920078f2b";

export default node;
