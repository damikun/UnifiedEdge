/**
 * @generated SignedSource<<95771b9d4dad946604ac2645e485aff4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiInfoFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ApiInfoGraphqlFragment" | "ApiInfoRestFragment">;
  readonly " $fragmentType": "ApiInfoFragment";
};
export type ApiInfoFragment$key = {
  readonly " $data"?: ApiInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApiInfoFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApiInfoFragment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApiInfoGraphqlFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ApiInfoRestFragment"
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "6b05b3210e25a6b2767911cb64fe6025";

export default node;
