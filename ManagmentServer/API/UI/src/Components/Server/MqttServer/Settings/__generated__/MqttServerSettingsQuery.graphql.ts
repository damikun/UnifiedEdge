/**
 * @generated SignedSource<<d9928ea3f2529a24aeab1a602edc6c0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerSettingsQuery$variables = {
  id: string;
};
export type MqttServerSettingsQuery$data = {
  readonly mqttServerById: {
    readonly " $fragmentSpreads": FragmentRefs<"ServerSharedSettingsFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerMqttClientSettingsFragment" | "MqttServerNetworkSettingsFragment">;
};
export type MqttServerSettingsQuery = {
  response: MqttServerSettingsQuery$data;
  variables: MqttServerSettingsQuery$variables;
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
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "server_uid",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerSharedSettingsFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttServerNetworkSettingsFragment"
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttServerMqttClientSettingsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "location",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              }
            ],
            "type": "GQL_IServer",
            "abstractKey": "__isGQL_IServer"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_MqttServerEndpoint",
        "kind": "LinkedField",
        "name": "mqttServerEndpoint",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "port",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "iPAddress",
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
        "concreteType": "GQL_MqttServerClientCfg",
        "kind": "LinkedField",
        "name": "mqttServerClientConfig",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "serverUID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "communicationTimeout",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "presistentSession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maxPendingMessagesPerClient",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1dade83713824c875ec7f1f9669a685c",
    "id": null,
    "metadata": {},
    "name": "MqttServerSettingsQuery",
    "operationKind": "query",
    "text": "query MqttServerSettingsQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    ...ServerSharedSettingsFragment\n    id\n  }\n  ...MqttServerNetworkSettingsFragment_2YLYDF\n  ...MqttServerMqttClientSettingsFragment_2YLYDF\n}\n\nfragment MqttServerClientComTimeoutDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  communicationTimeout\n}\n\nfragment MqttServerClientMaxPendingMessagesDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  maxPendingMessagesPerClient\n}\n\nfragment MqttServerClientPresistSessionDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  presistentSession\n}\n\nfragment MqttServerEndpointDataFragment_2YLYDF on Query {\n  mqttServerEndpoint(server_uid: $id) {\n    id\n    port\n    iPAddress\n    serverUid\n  }\n}\n\nfragment MqttServerMqttClientSettingsFragment_2YLYDF on Query {\n  mqttServerClientConfig(server_uid: $id) {\n    ...MqttServerClientComTimeoutDataFragment\n    ...MqttServerClientPresistSessionDataFragment\n    ...MqttServerClientMaxPendingMessagesDataFragment\n    id\n  }\n}\n\nfragment MqttServerNetworkSettingsFragment_2YLYDF on Query {\n  ...MqttServerEndpointDataFragment_2YLYDF\n}\n\nfragment ServerDescriptionDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  description\n}\n\nfragment ServerLocationDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  location\n}\n\nfragment ServerNameDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  name\n}\n\nfragment ServerSharedSettingsFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  ...ServerNameDataFragment\n  ...ServerLocationDataFragment\n  ...ServerDescriptionDataFragment\n}\n"
  }
};
})();

(node as any).hash = "afb3655a7b912f825df5d89c549c86fa";

export default node;
