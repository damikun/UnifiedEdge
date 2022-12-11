/**
 * @generated SignedSource<<0d8e2eab32acd8438822dbe4e00c7ea0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttNetLogLevel = "ERROR" | "INFO" | "VERBOSE" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type InstanceLogsItemDataFragment$data = {
  readonly logLevel: MqttNetLogLevel;
  readonly message: string | null;
  readonly source: string | null;
  readonly timeStamp: any;
  readonly uid: string;
  readonly " $fragmentType": "InstanceLogsItemDataFragment";
};
export type InstanceLogsItemDataFragment$key = {
  readonly " $data"?: InstanceLogsItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InstanceLogsItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "uid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "logLevel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeStamp",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerLog",
  "abstractKey": null
};

(node as any).hash = "627a68de8a63995df70f6cd6e11eca35";

export default node;
