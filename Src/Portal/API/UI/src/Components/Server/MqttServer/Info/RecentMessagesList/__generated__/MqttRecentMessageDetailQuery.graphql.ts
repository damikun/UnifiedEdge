/**
 * @generated SignedSource<<0ad32ff514df12292a6ece5961d4b7f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessageDetailQuery$variables = {
  message_uid: string;
  server_uid: string;
};
export type MqttRecentMessageDetailQuery$data = {
  readonly mqttServerMessageById: {
    readonly clientId: string | null;
    readonly dup: boolean;
    readonly expireInterval: number;
    readonly id: string;
    readonly qos: any;
    readonly responseTopic: string | null;
    readonly retain: boolean;
    readonly timeStamp: any;
    readonly topic: string;
    readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessageDetailmessagePayloadFragment">;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dup",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "qos",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "topic",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "retain",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clientId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeStamp",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "responseTopic",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expireInterval",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttRecentMessageDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttMessage",
        "kind": "LinkedField",
        "name": "mqttServerMessageById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "kind": "Defer",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MqttRecentMessageDetailmessagePayloadFragment"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ],
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
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttMessage",
        "kind": "LinkedField",
        "name": "mqttServerMessageById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          {
            "if": null,
            "kind": "Defer",
            "label": "MqttRecentMessageDetailQuery$defer$MqttRecentMessageDetailmessagePayloadFragment",
            "selections": [
              (v3/*: any*/),
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
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "41fe301b012245230342b380325ea931",
    "id": null,
    "metadata": {},
    "name": "MqttRecentMessageDetailQuery",
    "operationKind": "query",
    "text": "query MqttRecentMessageDetailQuery(\n  $server_uid: ID!\n  $message_uid: ID!\n) {\n  mqttServerMessageById(server_uid: $server_uid, message_uid: $message_uid) {\n    id\n    dup\n    qos\n    topic\n    retain\n    clientId\n    timeStamp\n    responseTopic\n    expireInterval\n    ...MqttRecentMessageDetailmessagePayloadFragment @defer(label: \"MqttRecentMessageDetailQuery$defer$MqttRecentMessageDetailmessagePayloadFragment\")\n  }\n}\n\nfragment MqttRecentMessageDetailmessagePayloadFragment on GQL_MqttMessage {\n  id\n  payload\n  contentType\n  isXmlPayload\n  isJsonPayload\n  isTextPayload\n  payloadUtf8Str\n}\n"
  }
};
})();

(node as any).hash = "5b809ac2b1735b2c5b33ba0b96bd1267";

export default node;
