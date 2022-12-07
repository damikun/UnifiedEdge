/**
 * @generated SignedSource<<b06b5bf1d22388a2150329817362e5d0>>
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
  readonly isConnected: boolean;
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
      "name": "isConnected",
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

(node as any).hash = "0c594ed6a02b1303cdffc1c51d2833c7";

export default node;
