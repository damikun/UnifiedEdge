/**
 * @generated SignedSource<<90b5613fc258c70610d396fe29ac3434>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerDescriptionDataFragment$data = {
  readonly description: string | null;
  readonly id: string;
  readonly " $fragmentType": "ServerDescriptionDataFragment";
};
export type ServerDescriptionDataFragment$key = {
  readonly " $data"?: ServerDescriptionDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerDescriptionDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerDescriptionDataFragment",
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "ecf4ada26eac9008bd86aa85d482f1a9";

export default node;
