/**
 * @generated SignedSource<<90d51f9ea5db3b6a6d7554704e40b931>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type EventType = "ERROR" | "INFO" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SystemLogItemDataFragment$data = {
  readonly iD: string;
  readonly name: string;
  readonly timeStamp: string;
  readonly type: EventType;
  readonly " $fragmentType": "SystemLogItemDataFragment";
};
export type SystemLogItemDataFragment$key = {
  readonly " $data"?: SystemLogItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemLogItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SystemLogItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "iD",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeStamp",
      "storageKey": null
    },
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

(node as any).hash = "ac0636c310642584be84920c38485d9e";

export default node;
