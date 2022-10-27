/**
 * @generated SignedSource<<35f601f4d5b54e8cbb06c98256297e0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetMqttServerClientMaxPendingMessagesInput = {
  maxPendingMessages: number;
  server_uid: string;
};
export type MqttServerClientMaxPendingMessagesUpdateMutation$variables = {
  input: SetMqttServerClientMaxPendingMessagesInput;
};
export type MqttServerClientMaxPendingMessagesUpdateMutation$data = {
  readonly setMqttServerClientMaxPendingMessages: {
    readonly gQL_MqttServerClientCfg: {
      readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientMaxPendingMessagesDataFragment">;
    } | null;
  };
};
export type MqttServerClientMaxPendingMessagesUpdateMutation = {
  response: MqttServerClientMaxPendingMessagesUpdateMutation$data;
  variables: MqttServerClientMaxPendingMessagesUpdateMutation$variables;
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
    "name": "MqttServerClientMaxPendingMessagesUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientMaxPendingMessagesPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientMaxPendingMessages",
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
                "name": "MqttServerClientMaxPendingMessagesDataFragment"
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
    "name": "MqttServerClientMaxPendingMessagesUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetMqttServerClientMaxPendingMessagesPayload",
        "kind": "LinkedField",
        "name": "setMqttServerClientMaxPendingMessages",
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
                "name": "maxPendingMessagesPerClient",
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
    "cacheID": "35839fa3d7c1eeb5618128a31ee4882d",
    "id": null,
    "metadata": {},
    "name": "MqttServerClientMaxPendingMessagesUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerClientMaxPendingMessagesUpdateMutation(\n  $input: SetMqttServerClientMaxPendingMessagesInput!\n) {\n  setMqttServerClientMaxPendingMessages(input: $input) {\n    gQL_MqttServerClientCfg {\n      ...MqttServerClientMaxPendingMessagesDataFragment\n      id\n    }\n  }\n}\n\nfragment MqttServerClientMaxPendingMessagesDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  maxPendingMessagesPerClient\n}\n"
  }
};
})();

(node as any).hash = "387f28bb50119e59578c8fd1f391f5fe";

export default node;
