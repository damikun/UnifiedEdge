/**
 * @generated SignedSource<<a59e0223d7c566e502e1c44467f98630>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttNetLogLevel = "ERROR" | "INFO" | "VERBOSE" | "WARNING" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttLogsItemDataFragment$data = {
  readonly logLevel: MqttNetLogLevel;
  readonly message: string | null;
  readonly source: string | null;
  readonly timeStamp: any;
  readonly uid: string;
  readonly " $fragmentType": "MqttLogsItemDataFragment";
};
export type MqttLogsItemDataFragment$key = {
  readonly " $data"?: MqttLogsItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttLogsItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttLogsItemDataFragment",
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

(node as any).hash = "54b96b57f22f00fc5c75444e3e65960b";

export default node;
