/**
 * @generated SignedSource<<d7395adb7b2b8e40ae49699de05e0e6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MqttClientsClientDisconnectedSubscription$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type MqttClientsClientDisconnectedSubscription$data = {
  readonly mqttClientDisconnected: {
    readonly client: {
      readonly id: string;
    };
  };
};
export type MqttClientsClientDisconnectedSubscription = {
  response: MqttClientsClientDisconnectedSubscription$data;
  variables: MqttClientsClientDisconnectedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    "name": "MqttClientsClientDisconnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttClientDisconnected",
        "kind": "LinkedField",
        "name": "mqttClientDisconnected",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttClient",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MqttClientsClientDisconnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttClientDisconnected",
        "kind": "LinkedField",
        "name": "mqttClientDisconnected",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttClient",
            "kind": "LinkedField",
            "name": "client",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteEdge",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9bc69581ce8d85e38ada64e588a5ae5c",
    "id": null,
    "metadata": {},
    "name": "MqttClientsClientDisconnectedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttClientsClientDisconnectedSubscription(\n  $id: ID!\n) {\n  mqttClientDisconnected(server_id: $id) {\n    client {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b6afd6cfeeb8f25a6796e2583ee39f78";

export default node;
