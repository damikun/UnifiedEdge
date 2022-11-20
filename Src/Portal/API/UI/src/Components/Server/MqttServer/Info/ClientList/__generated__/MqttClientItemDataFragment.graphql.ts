/**
 * @generated SignedSource<<d8dd5d574e735564a78f3f95d273abc2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type DTO_MqttProtocol = "UNKNOWN" | "V310" | "V311" | "V500" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttClientItemDataFragment$data = {
  readonly clientId: string;
  readonly connectedTimeStamp: any | null;
  readonly disconnectedTimeStamp: any | null;
  readonly id: string;
  readonly lastMessageTimestamp: any | null;
  readonly protocol: DTO_MqttProtocol;
  readonly serverUid: string;
  readonly " $fragmentType": "MqttClientItemDataFragment";
};
export type MqttClientItemDataFragment$key = {
  readonly " $data"?: MqttClientItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttClientItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttClientItemDataFragment",
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
      "name": "clientId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "protocol",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serverUid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "connectedTimeStamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "disconnectedTimeStamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessageTimestamp",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttClient",
  "abstractKey": null
};

(node as any).hash = "f37897a990476a198361dcc4c05fcbbd";

export default node;
