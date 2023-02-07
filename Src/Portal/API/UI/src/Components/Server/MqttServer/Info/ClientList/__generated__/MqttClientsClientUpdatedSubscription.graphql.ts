/**
 * @generated SignedSource<<8de9fdb48b8634ead0bc959872377449>>
 * @relayHash 90a45554ccaf8ad6367caa2ff6219dd3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 90a45554ccaf8ad6367caa2ff6219dd3

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttClientsClientUpdatedSubscription$variables = {
  id: string;
};
export type MqttClientsClientUpdatedSubscription$data = {
  readonly mqttClientUpdated: {
    readonly " $fragmentSpreads": FragmentRefs<"MqttClientItemDataFragment">;
  };
};
export type MqttClientsClientUpdatedSubscription = {
  response: MqttClientsClientUpdatedSubscription$data;
  variables: MqttClientsClientUpdatedSubscription$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttClientsClientUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttClient",
        "kind": "LinkedField",
        "name": "mqttClientUpdated",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MqttClientItemDataFragment"
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
    "name": "MqttClientsClientUpdatedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttClient",
        "kind": "LinkedField",
        "name": "mqttClientUpdated",
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
    ]
  },
  "params": {
    "id": "90a45554ccaf8ad6367caa2ff6219dd3",
    "metadata": {},
    "name": "MqttClientsClientUpdatedSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "1e3fd092a5adbb6f1fff146acd23ee05";

export default node;
