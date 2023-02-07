/**
 * @generated SignedSource<<b51ec545f734733c454020bd20fba4c5>>
 * @relayHash de2940fc41f1581dbc3bd5a012b2bd80
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID de2940fc41f1581dbc3bd5a012b2bd80

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
    readonly isSuccess: boolean;
    readonly jsonMetadata: string | null;
    readonly timeStamp: string;
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
        "name": "jsonMetadata",
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
        "name": "isSuccess",
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
    "id": "de2940fc41f1581dbc3bd5a012b2bd80",
    "metadata": {},
    "name": "MqttAuthLogDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "3f8c14362682ffb07f52bbf36491df0b";

export default node;
