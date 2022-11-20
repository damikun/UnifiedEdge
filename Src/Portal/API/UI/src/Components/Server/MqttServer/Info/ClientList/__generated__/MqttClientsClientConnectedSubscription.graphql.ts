/**
 * @generated SignedSource<<5cb83f55c476da35a307ee400d6ea25c>>
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
    "cacheID": "77140112a03402ec6fdf670889e603e6",
    "id": null,
    "metadata": {},
    "name": "MqttClientsClientConnectedSubscription",
    "operationKind": "subscription",
    "text": "subscription MqttClientsClientConnectedSubscription(\n  $id: ID!\n) {\n  mqttClientConnected(server_id: $id) {\n    client {\n      ...MqttClientItemDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttClientItemDataFragment on GQL_MqttClient {\n  id\n  clientId\n  protocol\n  serverUid\n  connectedTimeStamp\n  disconnectedTimeStamp\n  lastMessageTimestamp\n}\n"
  }
};
})();

(node as any).hash = "922fccf42474b87768075d3aaec68b29";

export default node;
