/**
 * @generated SignedSource<<ef620ccb6d27bd882c3e773cdc191606>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TokenListItemDataFragment$data = {
  readonly description: string;
  readonly expiration: any | null;
  readonly id: string;
  readonly " $fragmentType": "TokenListItemDataFragment";
};
export type TokenListItemDataFragment$key = {
  readonly " $data"?: TokenListItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TokenListItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TokenListItemDataFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expiration",
      "storageKey": null
    }
  ],
  "type": "GQL_Token",
  "abstractKey": null
};

(node as any).hash = "f5be964780eb478fc44475220c97bf13";

export default node;
