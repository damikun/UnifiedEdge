/**
 * @generated SignedSource<<58a087e3147d1e4291ce28c639f4b0fc>>
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
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ErrorSource",
          "kind": "LinkedField",
          "name": "errors",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "property",
              "storageKey": null
            },
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "ValidationError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/)
      ],
      "type": "ResultError",
      "abstractKey": "__isResultError"
    }
  ],
  "storageKey": null
};
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
          },
          (v3/*: any*/)
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
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b47fdbb484c9a7a838bf7d4cf0b207e2",
    "id": null,
    "metadata": {},
    "name": "MqttServerClientMaxPendingMessagesUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerClientMaxPendingMessagesUpdateMutation(\n  $input: SetMqttServerClientMaxPendingMessagesInput!\n) {\n  setMqttServerClientMaxPendingMessages(input: $input) {\n    gQL_MqttServerClientCfg {\n      ...MqttServerClientMaxPendingMessagesDataFragment\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n\nfragment MqttServerClientMaxPendingMessagesDataFragment on GQL_MqttServerClientCfg {\n  id\n  serverUID\n  maxPendingMessagesPerClient\n}\n"
  }
};
})();

(node as any).hash = "feca08f40b8808fd08a03e36ce716a57";

export default node;
