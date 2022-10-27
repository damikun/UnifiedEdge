/**
 * @generated SignedSource<<c8506c20997ca561b55084c8ae74d9df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetMqttServerClientPresistSessionInput = {
  presistSession: boolean;
  server_uid: string;
};
export type MqttServerClientPresistSessionUpdateMutation$variables = {
  input: SetMqttServerClientPresistSessionInput;
};
export type MqttServerClientPresistSessionUpdateMutation$data = {
  readonly setMqttServerClientPresistSession: {
    readonly gQL_MqttServerClientCfg: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientPresistSessionDataFragment">;
    } | null;
  };
};
export type MqttServerClientPresistSessionUpdateMutation = {
  response: MqttServerClientPresistSessionUpdateMutation$data;
  variables: MqttServerClientPresistSessionUpdateMutation$variables;
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
    "name": "MqttServerClientPresistSessionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientPresistSessionPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientPresistSession",
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
                "name": "MqttServerClientPresistSessionDataFragment"
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
    "name": "MqttServerClientPresistSessionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientPresistSessionPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientPresistSession",
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
                "name": "presistentSession",
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
    "cacheID": "0b853da045b68a39f99d41c3c53fe568",
    "id": null,
    "metadata": {},
    "name": "MqttServerClientPresistSessionUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerClientPresistSessionUpdateMutation(\n  $input: SetMqttServerClientPresistSessionInput!\n) {\n  setMqttServerClientPresistSession(input: $input) {\n    gQL_MqttServerClientCfg {\n      ...MqttServerClientPresistSessionDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttServerClientPresistSessionDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  presistentSession\n}\n"
  }
};
})();

(node as any).hash = "e0ab913355181c58fd03f2a364189c01";

export default node;
