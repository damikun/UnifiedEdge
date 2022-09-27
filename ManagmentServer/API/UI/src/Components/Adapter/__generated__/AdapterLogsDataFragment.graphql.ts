/**
 * @generated SignedSource<<fe56420ec1bbaf7bad567b1eefd9ccba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdapterLogsDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "AdapterLogsDataFragment";
};
export type AdapterLogsDataFragment$key = {
  readonly " $data"?: AdapterLogsDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterLogsDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdapterLogsDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_Adapter",
  "abstractKey": null
};

(node as any).hash = "4d327205ddcbd0074a7f4478627251b6";

export default node;
