/**
 * @generated SignedSource<<eb9ffc525daeca480d23cbb0dd4d2502>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type MqttResultCode = "BAD_AUTHENTICATION_METHOD" | "BAD_USER_NAME_OR_PASSWORD" | "BANNED" | "CLIENT_IDENTIFIER_NOT_VALID" | "CONNECTION_RATE_EXCEEDED" | "IMPLEMENTATION_SPECIFIC_ERROR" | "MALFORMED_PACKET" | "NOT_AUTHORIZED" | "PACKET_TOO_LARGE" | "PAYLOAD_FORMAT_INVALID" | "PROTOCOL_ERROR" | "QO_S_NOT_SUPPORTED" | "QUOTA_EXCEEDED" | "RETAIN_NOT_SUPPORTED" | "SERVER_BUSY" | "SERVER_MOVED" | "SERVER_UNAVAILABLE" | "SUCCESS" | "TOPIC_NAME_INVALID" | "UNSPECIFIED_ERROR" | "UNSUPPORTED_PROTOCOL_VERSION" | "USE_ANOTHER_SERVER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MqttAuthLogItemDataFragment$data = {
  readonly code: MqttResultCode;
  readonly errorMessage: string | null;
  readonly id: string;
  readonly timeStamp: any;
  readonly " $fragmentType": "MqttAuthLogItemDataFragment";
};
export type MqttAuthLogItemDataFragment$key = {
  readonly " $data"?: MqttAuthLogItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthLogItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttAuthLogItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "errorMessage",
      "storageKey": null
    },
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
      "name": "timeStamp",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttAuthLog",
  "abstractKey": null
};

(node as any).hash = "92d438b47dd04b4b0df65b6f8f69c535";

export default node;
