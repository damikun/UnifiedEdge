/**
 * @generated SignedSource<<33a70073bf41f4bd233cdf6a439925c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
export type RecordResult = "DATA_QUERY_ERROR" | "HTTP_ERROR" | "OK" | "PARAMETER_ERROR" | "UNDEFINED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type WebHookRecordItemDataFragment$data = {
  readonly guid: string;
  readonly hookEventGroup: HookEventGroup;
  readonly id: string;
  readonly result: RecordResult;
  readonly statusCode: number;
  readonly timestamp: any;
  readonly " $fragmentType": "WebHookRecordItemDataFragment";
};
export type WebHookRecordItemDataFragment$key = {
  readonly " $data"?: WebHookRecordItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookRecordItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookRecordItemDataFragment",
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
      "name": "result",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hookEventGroup",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "guid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timestamp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "statusCode",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHookRecord",
  "abstractKey": null
};

(node as any).hash = "aeb74c491809687b1f0c002c1939c030";

export default node;
