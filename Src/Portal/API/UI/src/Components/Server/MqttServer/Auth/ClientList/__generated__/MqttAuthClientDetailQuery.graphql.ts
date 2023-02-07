/**
 * @generated SignedSource<<c9527ff9cd78af9deaab007ffc54fded>>
 * @relayHash 0f406ec8ba3131fddbf8bef84596fa4f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0f406ec8ba3131fddbf8bef84596fa4f

import { ConcreteRequest, Query } from 'relay-runtime';
export type AuthAction = "ALLOW" | "DISALLOW" | "%future added value";
export type MqttAction = "PUBLISH" | "PUBLISH_AND_SUBSCRIBE" | "SUBSCRIBE" | "%future added value";
export type MqttAuthClientDetailQuery$variables = {
  authClient_id: string;
};
export type MqttAuthClientDetailQuery$data = {
  readonly mqttAuthClientById: {
    readonly clientId: string | null;
    readonly enabled: boolean;
    readonly id: string;
    readonly lastAuthenticate: string | null;
    readonly rules: ReadonlyArray<{
      readonly authAction: AuthAction;
      readonly id: string;
      readonly mqttAction: MqttAction;
      readonly topic: string | null;
    }>;
  };
};
export type MqttAuthClientDetailQuery = {
  response: MqttAuthClientDetailQuery$data;
  variables: MqttAuthClientDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authClient_id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authClient_id",
        "variableName": "authClient_id"
      }
    ],
    "concreteType": "GQL_MqttAuthClient",
    "kind": "LinkedField",
    "name": "mqttAuthClientById",
    "plural": false,
    "selections": [
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
        "name": "enabled",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastAuthenticate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttAuthRule",
        "kind": "LinkedField",
        "name": "rules",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "authAction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mqttAction",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttAuthClientDetailQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthClientDetailQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "0f406ec8ba3131fddbf8bef84596fa4f",
    "metadata": {},
    "name": "MqttAuthClientDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0cbfd838288ec466f9f23c1ed7c6ad5b";

export default node;
