/**
 * @generated SignedSource<<287e91a75c8692a747be9d04f7ae572a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MqttAuthUserDetailQuery$variables = {
  authUser_id: string;
};
export type MqttAuthUserDetailQuery$data = {
  readonly mqttAuthUserById: {
    readonly enabled: boolean;
    readonly id: string;
    readonly lastAuthenticate: any | null;
    readonly userName: string | null;
  };
};
export type MqttAuthUserDetailQuery = {
  response: MqttAuthUserDetailQuery$data;
  variables: MqttAuthUserDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authUser_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authUser_id",
        "variableName": "authUser_id"
      }
    ],
    "concreteType": "GQL_MqttAuthUser",
    "kind": "LinkedField",
    "name": "mqttAuthUserById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "userName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "enabled",
        "storageKey": null
      },
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
        "name": "lastAuthenticate",
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
    "name": "MqttAuthUserDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUserDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d5b31dfd872925d6fb6bdcfb812d702",
    "id": null,
    "metadata": {},
    "name": "MqttAuthUserDetailQuery",
    "operationKind": "query",
    "text": "query MqttAuthUserDetailQuery(\n  $authUser_id: ID!\n) {\n  mqttAuthUserById(authUser_id: $authUser_id) {\n    userName\n    enabled\n    id\n    lastAuthenticate\n  }\n}\n"
  }
};
})();

(node as any).hash = "da7ce6ddef975a547c47f178b9ac2e10";

export default node;
