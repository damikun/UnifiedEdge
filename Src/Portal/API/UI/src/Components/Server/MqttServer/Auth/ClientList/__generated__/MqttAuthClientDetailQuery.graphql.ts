/**
 * @generated SignedSource<<fe20df295a8a1f89600cfce7886d1501>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "afb17dd3b61c2316c7501532ac7d60fe",
    "id": null,
    "metadata": {},
    "name": "MqttAuthClientDetailQuery",
    "operationKind": "query",
    "text": "query MqttAuthClientDetailQuery(\n  $authClient_id: ID!\n) {\n  mqttAuthClientById(authClient_id: $authClient_id) {\n    clientId\n    enabled\n    id\n    rules {\n      authAction\n      mqttAction\n      topic\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b4854a129edc89373184cf1caf7ef081";

export default node;
