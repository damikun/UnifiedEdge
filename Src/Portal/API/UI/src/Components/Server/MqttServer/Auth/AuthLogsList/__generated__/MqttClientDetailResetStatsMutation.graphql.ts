/**
 * @generated SignedSource<<f30c09ebe5864b23fa7ac37fd2682517>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetMqttClientStatisticInput = {
  client_uid: string;
  server_uid: string;
};
export type MqttClientDetailResetStatsMutation$variables = {
  input: ResetMqttClientStatisticInput;
};
export type MqttClientDetailResetStatsMutation$data = {
  readonly resetMqttClientStatistic: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttClientStatistics: {
      readonly bytesReceived: any;
      readonly bytesSent: any;
      readonly id: string;
      readonly lastNonKeepAlivePacketReceivedTimestamp: any | null;
      readonly lastPacketReceivedTimestamp: any | null;
      readonly lastPacketSentTimestamp: any | null;
      readonly receivedApplicationMessagesCount: any;
      readonly receivedPacketsCount: any;
      readonly sentApplicationMessagesCount: any;
      readonly sentPacketsCount: any;
    } | null;
  };
};
export type MqttClientDetailResetStatsMutation = {
  response: MqttClientDetailResetStatsMutation$data;
  variables: MqttClientDetailResetStatsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ResetMqttClientStatisticPayload",
    "kind": "LinkedField",
    "name": "resetMqttClientStatistic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttClientStatistics",
        "kind": "LinkedField",
        "name": "gQL_MqttClientStatistics",
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
            "name": "bytesReceived",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "bytesSent",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sentPacketsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "receivedPacketsCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sentApplicationMessagesCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "receivedApplicationMessagesCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastNonKeepAlivePacketReceivedTimestamp",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastPacketReceivedTimestamp",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastPacketSentTimestamp",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
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
                  (v1/*: any*/)
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
              (v1/*: any*/)
            ],
            "type": "ResultError",
            "abstractKey": "__isResultError"
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
    "name": "MqttClientDetailResetStatsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttClientDetailResetStatsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "34ad66c0d3c0de1e1d40fa9f638425f1",
    "id": null,
    "metadata": {},
    "name": "MqttClientDetailResetStatsMutation",
    "operationKind": "mutation",
    "text": "mutation MqttClientDetailResetStatsMutation(\n  $input: ResetMqttClientStatisticInput!\n) {\n  resetMqttClientStatistic(input: $input) {\n    gQL_MqttClientStatistics {\n      id\n      bytesReceived\n      bytesSent\n      sentPacketsCount\n      receivedPacketsCount\n      sentApplicationMessagesCount\n      receivedApplicationMessagesCount\n      lastNonKeepAlivePacketReceivedTimestamp\n      lastPacketReceivedTimestamp\n      lastPacketSentTimestamp\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8370e0f20789a2b98568ffc9cc72669f";

export default node;
