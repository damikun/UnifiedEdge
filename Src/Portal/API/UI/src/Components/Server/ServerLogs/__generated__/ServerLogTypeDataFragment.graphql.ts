/**
 * @generated SignedSource<<9e2591e4cc7cd3c305c18a5f0969a1d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ServerEventTypes = "ERROR" | "INFO" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServerLogTypeDataFragment$data = {
  readonly type: ServerEventTypes;
  readonly " $fragmentType": "ServerLogTypeDataFragment";
};
export type ServerLogTypeDataFragment$key = {
  readonly " $data"?: ServerLogTypeDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerLogTypeDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerLogTypeDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "GQL_IServerEvent",
  "abstractKey": "__isGQL_IServerEvent"
};

(node as any).hash = "01a190bfdd1f1c0317a8d714d98c7ae1";

export default node;
