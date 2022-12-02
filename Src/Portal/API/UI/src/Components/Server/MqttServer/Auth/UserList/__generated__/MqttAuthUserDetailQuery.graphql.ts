/**
 * @generated SignedSource<<3a0ef018194698c50c043cc252f4a06e>>
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
    "cacheID": "7fde4551c811c68643c6ed0eb3013fe1",
    "id": null,
    "metadata": {},
    "name": "MqttAuthUserDetailQuery",
    "operationKind": "query",
    "text": "query MqttAuthUserDetailQuery(\n  $authUser_id: ID!\n) {\n  mqttAuthUserById(authUser_id: $authUser_id) {\n    userName\n    enabled\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f4c86c4483aba1bf79fbc4491b8d33ed";

export default node;
