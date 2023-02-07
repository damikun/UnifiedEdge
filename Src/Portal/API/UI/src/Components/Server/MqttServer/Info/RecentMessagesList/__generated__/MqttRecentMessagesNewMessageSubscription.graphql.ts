/**
 * @generated SignedSource<<43bb4cc4975a1cdb738de7d7f7a2bcf6>>
 * @relayHash f9d9fcc04b022d794a488f879ef927d5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f9d9fcc04b022d794a488f879ef927d5

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesNewMessageSubscription$variables = {
  client_id?: string | null;
  id: string;
  topic_id?: string | null;
};
export type MqttRecentMessagesNewMessageSubscription$data = {
  readonly mqttServerNewMessage: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesItemDataFragment">;
  };
};
export type MqttRecentMessagesNewMessageSubscription = {
  response: MqttRecentMessagesNewMessageSubscription$data;
  variables: MqttRecentMessagesNewMessageSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "client_id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topic_id"
},
v3 = [
  {
    "kind": "Variable",
    "name": "client_id",
    "variableName": "client_id"
  },
  {
    "kind": "Variable",
    "name": "server_id",
    "variableName": "id"
  },
  {
    "kind": "Variable",
    "name": "topic_id",
    "variableName": "topic_id"
  }
],
v4 = {
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
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttRecentMessagesNewMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_MqttMessage",
        "kind": "LinkedField",
        "name": "mqttServerNewMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MqttRecentMessagesItemDataFragment"
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
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "MqttRecentMessagesNewMessageSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_MqttMessage",
        "kind": "LinkedField",
        "name": "mqttServerNewMessage",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clientUid",
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
            "name": "clientId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "timeStamp",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f9d9fcc04b022d794a488f879ef927d5",
    "metadata": {},
    "name": "MqttRecentMessagesNewMessageSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "ade7d467e9597095d42ae83c89a5a491";

export default node;
