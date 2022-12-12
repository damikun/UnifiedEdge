/**
 * @generated SignedSource<<37061024b700ba1a8d9c2472279f7207>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApiInfoRestFragment$data = {
  readonly apiRest: boolean;
  readonly id: string;
  readonly " $fragmentType": "ApiInfoRestFragment";
};
export type ApiInfoRestFragment$key = {
  readonly " $data"?: ApiInfoRestFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApiInfoRestFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApiInfoRestFragment",
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
      "name": "apiRest",
      "storageKey": null
    }
  ],
  "type": "GQL_Edge",
  "abstractKey": null
};

(node as any).hash = "813281857933832c64074f009179789f";

export default node;
