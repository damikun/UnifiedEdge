/**
 * @generated SignedSource<<756c131e8b95a96a22ac50a790216100>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerMessageDetailmessagePayloadFragment$data = {
  readonly contentType: string | null;
  readonly id: string;
  readonly isJsonPayload: boolean;
  readonly isTextPayload: boolean;
  readonly isXmlPayload: boolean;
  readonly payload: ReadonlyArray<any> | null;
  readonly payloadUtf8Str: string | null;
  readonly " $fragmentType": "MqttExplorerMessageDetailmessagePayloadFragment";
};
export type MqttExplorerMessageDetailmessagePayloadFragment$key = {
  readonly " $data"?: MqttExplorerMessageDetailmessagePayloadFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerMessageDetailmessagePayloadFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttExplorerMessageDetailmessagePayloadFragment",
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
      "name": "payload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contentType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isXmlPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isJsonPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isTextPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payloadUtf8Str",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttMessage",
  "abstractKey": null
};

(node as any).hash = "5728d27aac716e32112f0c0de32afab6";

export default node;
