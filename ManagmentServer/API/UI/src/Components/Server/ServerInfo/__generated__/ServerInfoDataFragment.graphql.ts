/**
 * @generated SignedSource<<2b38e7807bb797dbd264afb90bb46b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoDataFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoNameDataFragment" | "ServerInfoStateDataFragment" | "ServerInfoUptimeDataFragment">;
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
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "9d5978cb65588edf9f8a131d7f464282";

export default node;
