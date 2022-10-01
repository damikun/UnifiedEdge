/**
 * @generated SignedSource<<3a147c554263f0f96a73cefb1cbe01d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type EventType = "ERROR" | "INFO" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SystemLogTypeDataFragment$data = {
  readonly type: EventType;
  readonly " $fragmentType": "SystemLogTypeDataFragment";
};
export type SystemLogTypeDataFragment$key = {
  readonly " $data"?: SystemLogTypeDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemLogTypeDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SystemLogTypeDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "GQL_SystemEvent",
  "abstractKey": null
};

(node as any).hash = "15c348c4e781f00eabdd2a1999a26f6f";

export default node;
