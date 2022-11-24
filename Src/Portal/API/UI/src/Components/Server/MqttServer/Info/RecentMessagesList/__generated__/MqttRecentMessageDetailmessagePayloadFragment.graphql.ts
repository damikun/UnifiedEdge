/**
 * @generated SignedSource<<0b208ecf7c4dfcee3bba8b8ffaaaadba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessageDetailmessagePayloadFragment$data = {
  readonly contentType: string | null;
  readonly id: string;
  readonly isJsonPayload: boolean;
  readonly isTextPayload: boolean;
  readonly isXmlPayload: boolean;
  readonly payload: ReadonlyArray<any> | null;
  readonly payloadUtf8Str: string | null;
  readonly " $fragmentType": "MqttRecentMessageDetailmessagePayloadFragment";
};
export type MqttRecentMessageDetailmessagePayloadFragment$key = {
  readonly " $data"?: MqttRecentMessageDetailmessagePayloadFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessageDetailmessagePayloadFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttRecentMessageDetailmessagePayloadFragment",
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

(node as any).hash = "2cdb5de481d692fe7b03cecb24531746";

export default node;
