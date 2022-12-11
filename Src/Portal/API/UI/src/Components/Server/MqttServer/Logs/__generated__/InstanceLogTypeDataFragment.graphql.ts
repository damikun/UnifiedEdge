/**
 * @generated SignedSource<<254ec696c941e98af881fc4931641196>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttNetLogLevel = "ERROR" | "INFO" | "VERBOSE" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type InstanceLogTypeDataFragment$data = {
  readonly logLevel: MqttNetLogLevel;
  readonly " $fragmentType": "InstanceLogTypeDataFragment";
};
export type InstanceLogTypeDataFragment$key = {
  readonly " $data"?: InstanceLogTypeDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogTypeDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstanceLogTypeDataFragment",
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

(node as any).hash = "b36180af18c9252bffe53d8c89eb352e";

export default node;
