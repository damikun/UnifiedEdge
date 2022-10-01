/**
 * @generated SignedSource<<edc5f46d4e929fb5367af75b8b8abef7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SystemSettingsDataFragment$data = {
  readonly edgeInfo: {
    readonly description: string | null;
    readonly guid: string;
    readonly name: string;
  };
  readonly " $fragmentType": "SystemSettingsDataFragment";
};
export type SystemSettingsDataFragment$key = {
  readonly " $data"?: SystemSettingsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemSettingsDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SystemSettingsDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_Edge",
      "kind": "LinkedField",
      "name": "edgeInfo",
      "plural": false,
      "selections": [
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
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "guid",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "8e2a550d0452b7d894547db3ca1c770d";

export default node;
