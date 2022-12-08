/**
 * @generated SignedSource<<29801f5fa23638703469a8fc16b8f8f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MqttResultCode = "BAD_AUTHENTICATION_METHOD" | "BAD_USER_NAME_OR_PASSWORD" | "BANNED" | "CLIENT_IDENTIFIER_NOT_VALID" | "CONNECTION_RATE_EXCEEDED" | "IMPLEMENTATION_SPECIFIC_ERROR" | "MALFORMED_PACKET" | "NOT_AUTHORIZED" | "PACKET_TOO_LARGE" | "PAYLOAD_FORMAT_INVALID" | "PROTOCOL_ERROR" | "QO_S_NOT_SUPPORTED" | "QUOTA_EXCEEDED" | "RETAIN_NOT_SUPPORTED" | "SERVER_BUSY" | "SERVER_MOVED" | "SERVER_UNAVAILABLE" | "SUCCESS" | "TOPIC_NAME_INVALID" | "UNSPECIFIED_ERROR" | "UNSUPPORTED_PROTOCOL_VERSION" | "USE_ANOTHER_SERVER" | "%future added value";
export type MqttAuthLogDetailQuery$variables = {
  log_id: string;
};
export type MqttAuthLogDetailQuery$data = {
  readonly mqttAuthLogById: {
    readonly authClientId: any | null;
    readonly authUserId: string | null;
    readonly code: MqttResultCode;
    readonly description: string | null;
    readonly errorMessage: string | null;
    readonly id: string;
    readonly timeStamp: any;
  };
};
export type MqttAuthLogDetailQuery = {
  response: MqttAuthLogDetailQuery$data;
  variables: MqttAuthLogDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "log_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "log_id",
        "variableName": "log_id"
      }
    ],
    "concreteType": "GQL_MqttAuthLog",
    "kind": "LinkedField",
    "name": "mqttAuthLogById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "authClientId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "authUserId",
        "storageKey": null
      },
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
        "name": "description",
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttAuthLogDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthLogDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8870581e6acdbc8281882b27fd215f4a",
    "id": null,
    "metadata": {},
    "name": "MqttAuthLogDetailQuery",
    "operationKind": "query",
    "text": "query MqttAuthLogDetailQuery(\n  $log_id: ID!\n) {\n  mqttAuthLogById(log_id: $log_id) {\n    authClientId\n    authUserId\n    code\n    description\n    errorMessage\n    id\n    timeStamp\n  }\n}\n"
  }
};
})();

(node as any).hash = "715caca672d2730049ebbffd5091c248";

export default node;
