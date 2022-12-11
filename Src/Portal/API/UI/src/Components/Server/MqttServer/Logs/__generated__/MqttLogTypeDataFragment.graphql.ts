/**
 * @generated SignedSource<<10bb7d27ccfc56cbb9cb576610a4f1f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttNetLogLevel = "ERROR" | "INFO" | "VERBOSE" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttLogTypeDataFragment$data = {
  readonly logLevel: MqttNetLogLevel;
  readonly " $fragmentType": "MqttLogTypeDataFragment";
};
export type MqttLogTypeDataFragment$key = {
  readonly " $data"?: MqttLogTypeDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttLogTypeDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttLogTypeDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "logLevel",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerLog",
  "abstractKey": null
};

(node as any).hash = "2fba89c8cc937444aa61fd7a8b83de80";

export default node;
