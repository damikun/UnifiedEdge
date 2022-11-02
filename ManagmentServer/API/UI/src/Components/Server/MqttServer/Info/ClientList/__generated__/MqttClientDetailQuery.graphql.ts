/**
 * @generated SignedSource<<469a16b63f18d5209b105954486f7ef4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type GQL_MqttProtocol = "UNKNOWN" | "V310" | "V311" | "V500" | "%future added value";
export type MqttClientDetailQuery$variables = {
  server_client_uid: string;
  server_uid: string;
};
export type MqttClientDetailQuery$data = {
  readonly mqttServerClient: {
    readonly id: string;
    readonly protocol: GQL_MqttProtocol;
    readonly rawId: string | null;
    readonly serverUid: string;
  };
  readonly mqttServerClientStatistic: {
    readonly bytesReceived: any;
    readonly bytesSent: any;
    readonly lastNonKeepAlivePacketReceivedTimestamp: any | null;
    readonly lastPacketReceivedTimestamp: any | null;
    readonly lastPacketSentTimestamp: any | null;
    readonly receivedApplicationMessagesCount: any;
    readonly receivedPacketsCount: any;
    readonly sentApplicationMessagesCount: any;
    readonly sentPacketsCount: any;
  } | null;
};
export type MqttClientDetailQuery = {
  response: MqttClientDetailQuery$data;
  variables: MqttClientDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "server_client_uid"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "server_uid"
},
v2 = [
  {
    "kind": "Variable",
    "name": "server_client_uid",
    "variableName": "server_client_uid"
  },
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "server_uid"
  }
],
v3 = [
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "GQL_MqttClient",
    "kind": "LinkedField",
    "name": "mqttServerClient",
    "plural": false,
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
        "name": "protocol",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "rawId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "serverUid",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v2/*: any*/),
    "concreteType": "GQL_MqttClientStatistics",
    "kind": "LinkedField",
    "name": "mqttServerClientStatistic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "bytesReceived",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "bytesSent",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sentPacketsCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "receivedPacketsCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sentApplicationMessagesCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "receivedApplicationMessagesCount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastNonKeepAlivePacketReceivedTimestamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastPacketReceivedTimestamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastPacketSentTimestamp",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttClientDetailQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MqttClientDetailQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "e1f1bcc2fcb111cd2ba3fd8dd9a420af",
    "id": null,
    "metadata": {},
    "name": "MqttClientDetailQuery",
    "operationKind": "query",
    "text": "query MqttClientDetailQuery(\n  $server_uid: ID!\n  $server_client_uid: ID!\n) {\n  mqttServerClient(server_uid: $server_uid, server_client_uid: $server_client_uid) {\n    id\n    protocol\n    rawId\n    serverUid\n  }\n  mqttServerClientStatistic(server_uid: $server_uid, server_client_uid: $server_client_uid) {\n    bytesReceived\n    bytesSent\n    sentPacketsCount\n    receivedPacketsCount\n    sentApplicationMessagesCount\n    receivedApplicationMessagesCount\n    lastNonKeepAlivePacketReceivedTimestamp\n    lastPacketReceivedTimestamp\n    lastPacketSentTimestamp\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8771166e89e855d0fa5b44772cfd476";

export default node;
