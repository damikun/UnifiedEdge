/**
 * @generated SignedSource<<83f1a49d78131a203bd54762d235128d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MqttRecentMessageDetailQuery$variables = {
  message_uid: string;
  server_uid: string;
};
export type MqttRecentMessageDetailQuery$data = {
  readonly mqttServerMessageById: {
    readonly clientId: string | null;
    readonly contentType: string | null;
    readonly dup: boolean;
    readonly expireInterval: number;
    readonly id: string;
    readonly isJsonPayload: boolean;
    readonly isTextPayload: boolean;
    readonly isXmlPayload: boolean;
    readonly payload: ReadonlyArray<any> | null;
    readonly payloadUtf8Str: string | null;
    readonly qos: any;
    readonly responseTopic: string | null;
    readonly retain: boolean;
    readonly timeStamp: any;
    readonly topic: string;
  } | null;
};
export type MqttRecentMessageDetailQuery = {
  response: MqttRecentMessageDetailQuery$data;
  variables: MqttRecentMessageDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "message_uid"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "server_uid"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "message_uid",
        "variableName": "message_uid"
      },
      {
        "kind": "Variable",
        "name": "server_uid",
        "variableName": "server_uid"
      }
    ],
    "concreteType": "GQL_MqttMessage",
    "kind": "LinkedField",
    "name": "mqttServerMessageById",
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
        "name": "dup",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "qos",
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
        "name": "retain",
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
        "name": "clientId",
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
        "name": "responseTopic",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expireInterval",
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
    "name": "MqttRecentMessageDetailQuery",
    "selections": (v2/*: any*/),
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
    "name": "MqttRecentMessageDetailQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "50becd6a25dadc40da3a6a7673fd60aa",
    "id": null,
    "metadata": {},
    "name": "MqttRecentMessageDetailQuery",
    "operationKind": "query",
    "text": "query MqttRecentMessageDetailQuery(\n  $server_uid: ID!\n  $message_uid: ID!\n) {\n  mqttServerMessageById(server_uid: $server_uid, message_uid: $message_uid) {\n    id\n    dup\n    qos\n    topic\n    retain\n    payload\n    clientId\n    timeStamp\n    contentType\n    isXmlPayload\n    isJsonPayload\n    isTextPayload\n    responseTopic\n    expireInterval\n    payloadUtf8Str\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd038729bfbfe6118022d0e645adcb87";

export default node;
