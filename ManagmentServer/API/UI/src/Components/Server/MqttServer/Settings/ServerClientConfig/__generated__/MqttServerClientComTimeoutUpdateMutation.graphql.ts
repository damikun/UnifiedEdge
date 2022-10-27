/**
 * @generated SignedSource<<88388fba36b13a723dfebe1955ae80e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetMqttServerClientCommunicationTimeoutInput = {
  server_uid: string;
  timeout_ms: number;
};
export type MqttServerClientComTimeoutUpdateMutation$variables = {
  input: SetMqttServerClientCommunicationTimeoutInput;
};
export type MqttServerClientComTimeoutUpdateMutation$data = {
  readonly setMqttServerClientCommunicationTimeout: {
    readonly gQL_MqttServerClientCfg: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientComTimeoutDataFragment">;
    } | null;
  };
};
export type MqttServerClientComTimeoutUpdateMutation = {
  response: MqttServerClientComTimeoutUpdateMutation$data;
  variables: MqttServerClientComTimeoutUpdateMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerClientComTimeoutUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientCommunicationTimeoutPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientCommunicationTimeout",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttServerClientCfg",
            "kind": "LinkedField",
            "name": "gQL_MqttServerClientCfg",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MqttServerClientComTimeoutDataFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerClientComTimeoutUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientCommunicationTimeoutPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientCommunicationTimeout",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttServerClientCfg",
            "kind": "LinkedField",
            "name": "gQL_MqttServerClientCfg",
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
                "name": "serverUID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "communicationTimeout",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f11f30cef77bf7b39ecf622e436da9b5",
    "id": null,
    "metadata": {},
    "name": "MqttServerClientComTimeoutUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerClientComTimeoutUpdateMutation(\n  $input: SetMqttServerClientCommunicationTimeoutInput!\n) {\n  setMqttServerClientCommunicationTimeout(input: $input) {\n    gQL_MqttServerClientCfg {\n      ...MqttServerClientComTimeoutDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttServerClientComTimeoutDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  communicationTimeout\n}\n"
  }
};
})();

(node as any).hash = "986b11e83e9c4c53edf808edaa2c9245";

export default node;
