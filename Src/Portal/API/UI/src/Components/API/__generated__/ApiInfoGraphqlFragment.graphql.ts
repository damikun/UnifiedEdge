/**
 * @generated SignedSource<<21412952a6878cc14cd997e971448690>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiInfoGraphqlFragment$data = {
  readonly apiGraphql: boolean;
  readonly id: string;
  readonly " $fragmentType": "ApiInfoGraphqlFragment";
};
export type ApiInfoGraphqlFragment$key = {
  readonly " $data"?: ApiInfoGraphqlFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApiInfoGraphqlFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApiInfoGraphqlFragment",
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
      "name": "apiGraphql",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "9992ba38f2c5966bf5a0f50e5d2adc26";

export default node;
