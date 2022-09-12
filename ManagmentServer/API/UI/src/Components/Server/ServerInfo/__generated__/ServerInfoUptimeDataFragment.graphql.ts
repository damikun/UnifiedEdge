/**
 * @generated SignedSource<<c0b752fd5b4c516b3c879de3df08483c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoUptimeDataFragment$data = {
  readonly id: string;
  readonly uptime: {
    readonly days: number;
    readonly hours: number;
    readonly isValid: boolean;
    readonly minutes: number;
    readonly uptime: any | null;
  };
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "7032f1e6fc6b007c249bc95f83c7cafd";

export default node;
