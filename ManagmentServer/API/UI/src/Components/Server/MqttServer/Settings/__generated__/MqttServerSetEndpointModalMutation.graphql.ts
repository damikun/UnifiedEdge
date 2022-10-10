/**
 * @generated SignedSource<<60bfd974066092cb59b88a9a79c16edf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetMqttServerEndpointInput = {
  ip: string;
  port: number;
  server_uid: string;
};
export type MqttServerSetEndpointModalMutation$variables = {
  input: SetMqttServerEndpointInput;
};
export type MqttServerSetEndpointModalMutation$data = {
  readonly setMqttServerEndpoint: {
    readonly gQL_MqttServerEndpoint: {
      readonly iPAddress: string;
      readonly id: string;
      readonly port: any;
      readonly serverUid: string;
    } | null;
  };
};
export type MqttServerSetEndpointModalMutation = {
  response: MqttServerSetEndpointModalMutation$data;
  variables: MqttServerSetEndpointModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SetMqttServerEndpointPayload",
    "kind": "LinkedField",
    "name": "setMqttServerEndpoint",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttServerEndpoint",
        "kind": "LinkedField",
        "name": "gQL_MqttServerEndpoint",
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
            "name": "iPAddress",
            "storageKey": null
          },
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
            "name": "serverUid",
            "storageKey": null
          }
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
    "name": "MqttServerSetEndpointModalMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerSetEndpointModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4fa4185d6ad450957a6c138c2d4636b3",
    "id": null,
    "metadata": {},
    "name": "MqttServerSetEndpointModalMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerSetEndpointModalMutation(\n  $input: SetMqttServerEndpointInput!\n) {\n  setMqttServerEndpoint(input: $input) {\n    gQL_MqttServerEndpoint {\n      id\n      iPAddress\n      port\n      serverUid\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "608430d83af9469ea63b4e2325fdbd18";

export default node;
