/**
 * @generated SignedSource<<b71934967e3f9d46d34880f41e607c5c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttClientsClientDisconnectedSubscription$variables = {
  id: string;
};
export type MqttClientsClientDisconnectedSubscription$data = {
  readonly mqttClientDisconnected: {
    readonly client: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MqttClientItemDataFragment">;
    };
  };
};
export type MqttClientsClientDisconnectedSubscription = {
  response: MqttClientsClientDisconnectedSubscription$data;
  variables: MqttClientsClientDisconnectedSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttClientsClientDisconnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MqttClientItemDataFragment"
              }
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttClientsClientDisconnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
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
                "name": "protocol",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "serverUid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isConnected",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "connectedTimeStamp",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "disconnectedTimeStamp",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastMessageTimestamp",
                "storageKey": null
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
    "cacheID": "5ca537ccae0a0062aba9ea0780d4bc44",
    "id": null,
    "metadata": {},
    "name": "MqttClientsClientDisconnectedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttClientsClientDisconnectedSubscription(\n  $id: ID!\n) {\n  mqttClientDisconnected(server_id: $id) {\n    client {\n      id\n      ...MqttClientItemDataFragment\n    }\n  }\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  clientId\n  protocol\n  serverUid\n  isConnected\n  connectedTimeStamp\n  disconnectedTimeStamp\n  lastMessageTimestamp\n}\n"
  }
};
})();

(node as any).hash = "4aa022f897a00421b31ba37a9b263186";

export default node;
