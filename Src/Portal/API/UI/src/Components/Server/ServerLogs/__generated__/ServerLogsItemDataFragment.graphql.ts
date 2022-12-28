/**
 * @generated SignedSource<<f10cd57bdcc90b051e667ad3d4aefc3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ServerEventTypes = "ERROR" | "INFO" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ServerLogsItemDataFragment$data = {
  readonly iD: string;
  readonly name: string;
  readonly timeStamp: string;
  readonly type: ServerEventTypes;
  readonly " $fragmentType": "ServerLogsItemDataFragment";
};
export type ServerLogsItemDataFragment$key = {
  readonly " $data"?: ServerLogsItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerLogsItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerLogsItemDataFragment",
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
  "type": "GQL_IServerEvent",
  "abstractKey": "__isGQL_IServerEvent"
};

(node as any).hash = "c6db442f6d5872b3dadae437db8e5977";

export default node;
