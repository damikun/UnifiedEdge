/**
 * @generated SignedSource<<4b158de1d9d573cf56d3de672b29b3f5>>
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
  readonly description: string | null;
  readonly errorMessage: string | null;
  readonly id: string;
  readonly jsonMetadata: string | null;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "jsonMetadata",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttAuthLog",
  "abstractKey": null
};

(node as any).hash = "d397e7eec83eab156e545a5e6b65fcb5";

export default node;
