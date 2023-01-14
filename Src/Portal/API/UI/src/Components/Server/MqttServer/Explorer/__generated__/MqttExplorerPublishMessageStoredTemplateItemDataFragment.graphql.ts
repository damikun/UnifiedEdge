/**
 * @generated SignedSource<<8b7e16db694eedc3be209ab6290f940c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MessageContentType = "JSON" | "TEXT" | "UNDEFINED" | "%future added value";
export type MessageQoS = "AT_LEAST_ONCE" | "AT_MOST_ONCE" | "EXACTLY_ONCE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerPublishMessageStoredTemplateItemDataFragment$data = {
  readonly contentType: MessageContentType;
  readonly expireInterval: number | null;
  readonly id: string;
  readonly name: string;
  readonly payload: string | null;
  readonly qoS: MessageQoS;
  readonly retain: boolean;
  readonly topic: string | null;
  readonly " $fragmentType": "MqttExplorerPublishMessageStoredTemplateItemDataFragment";
};
export type MqttExplorerPublishMessageStoredTemplateItemDataFragment$key = {
  readonly " $data"?: MqttExplorerPublishMessageStoredTemplateItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerPublishMessageStoredTemplateItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttExplorerPublishMessageStoredTemplateItemDataFragment",
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
      "name": "name",
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
      "name": "qoS",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "retain",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
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
      "name": "expireInterval",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttMessageTemplate",
  "abstractKey": null
};

(node as any).hash = "06f545083f34a1f615abac7a6ded7b4a";

export default node;
