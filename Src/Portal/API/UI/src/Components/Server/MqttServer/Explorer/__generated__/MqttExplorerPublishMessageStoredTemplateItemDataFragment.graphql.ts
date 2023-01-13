/**
 * @generated SignedSource<<10f11ae6c5b633eacb9c1f889840a10b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MessageQoS = "AT_LEAST_ONCE" | "AT_MOST_ONCE" | "EXACTLY_ONCE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerPublishMessageStoredTemplateItemDataFragment$data = {
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
    }
  ],
  "type": "GQL_MqttMessageTemplate",
  "abstractKey": null
};

(node as any).hash = "5ed5c6f95b6727f8c77cdc389ee41b66";

export default node;
