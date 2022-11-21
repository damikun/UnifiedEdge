/**
 * @generated SignedSource<<3024e2b0fedfbb43709e3ac64b92e0a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttClientsClientConnectedSubscription$variables = {
  connections: ReadonlyArray<string>;
  id: string;
};
export type MqttClientsClientConnectedSubscription$data = {
  readonly mqttNewClient: {
    readonly client: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttClientItemDataFragment">;
    };
  };
};
export type MqttClientsClientConnectedSubscription = {
  response: MqttClientsClientConnectedSubscription$data;
  variables: MqttClientsClientConnectedSubscription$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttClientsClientConnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttNewClient",
        "kind": "LinkedField",
        "name": "mqttNewClient",
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "MqttClientsClientConnectedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttNewClient",
        "kind": "LinkedField",
        "name": "mqttNewClient",
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
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "client",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_MqttNewClientEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "47053745d32c672d79abbd308d75ac17",
    "id": null,
    "metadata": {},
    "name": "MqttClientsClientConnectedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttClientsClientConnectedSubscription(\n  $id: ID!\n) {\n  mqttNewClient(server_id: $id) {\n    client {\n      ...MqttClientItemDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  clientId\n  protocol\n  serverUid\n  isConnected\n  connectedTimeStamp\n  disconnectedTimeStamp\n  lastMessageTimestamp\n}\n"
  }
};
})();

(node as any).hash = "5e9d67f52c15eeb0c5f9274975ea00d9";

export default node;
