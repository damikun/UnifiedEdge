/**
 * @generated SignedSource<<40f0a8aa31675fe24e9f298db8c96046>>
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
  readonly mqttClientConnected: {
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
        "concreteType": "GQL_MqttClientConnected",
        "kind": "LinkedField",
        "name": "mqttClientConnected",
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
        "concreteType": "GQL_MqttClientConnected",
        "kind": "LinkedField",
        "name": "mqttClientConnected",
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
                "name": "rawId",
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
                "name": "connectedAt",
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
                "value": "GQL_MqttClientEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6de9ce0d1920d6eb9268e02162a6e4f",
    "id": null,
    "metadata": {},
    "name": "MqttClientsClientConnectedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttClientsClientConnectedSubscription(\n  $id: ID!\n) {\n  mqttClientConnected(server_id: $id) {\n    client {\n      ...MqttClientItemDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  rawId\n  protocol\n  serverUid\n  connectedAt\n}\n"
  }
};
})();

(node as any).hash = "922fccf42474b87768075d3aaec68b29";

export default node;
