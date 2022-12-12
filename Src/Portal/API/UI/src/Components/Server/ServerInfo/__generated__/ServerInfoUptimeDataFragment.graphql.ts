/**
 * @generated SignedSource<<89c7234d616d9cd7e566c8e23b035eff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoUptimeDataFragment$data = {
  readonly uptime: {
    readonly days: number;
    readonly hours: number;
    readonly isValid: boolean;
    readonly minutes: number;
    readonly uptime: any | null;
  } | null;
  readonly " $fragmentType": "ServerInfoUptimeDataFragment";
};
export type ServerInfoUptimeDataFragment$key = {
  readonly " $data"?: ServerInfoUptimeDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoUptimeDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoUptimeDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_Uptime",
      "kind": "LinkedField",
      "name": "uptime",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "days",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hours",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isValid",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "minutes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uptime",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "dabd27e91a10e4311a08ea103d3d115c";

export default node;
