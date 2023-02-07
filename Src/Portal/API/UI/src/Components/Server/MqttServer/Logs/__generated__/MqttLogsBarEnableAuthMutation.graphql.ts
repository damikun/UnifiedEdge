/**
 * @generated SignedSource<<61859ff12d6052576dd274d3d7a84d86>>
 * @relayHash 7601290fdcf55cbb2f69d8a5cd1b7dc8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7601290fdcf55cbb2f69d8a5cd1b7dc8

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableMqttLoggingInput = {
  enable: boolean;
  server_uid: string;
};
export type MqttLogsBarEnableAuthMutation$variables = {
  input: EnableMqttLoggingInput;
};
export type MqttLogsBarEnableAuthMutation$data = {
  readonly enableMqttLogging: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttServer: {
      readonly id: string;
      readonly loggingEnabled: boolean;
    } | null;
  };
};
export type MqttLogsBarEnableAuthMutation = {
  response: MqttLogsBarEnableAuthMutation$data;
  variables: MqttLogsBarEnableAuthMutation$variables;
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
    "concreteType": "EnableMqttLoggingPayload",
    "kind": "LinkedField",
    "name": "enableMqttLogging",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "gQL_MqttServer",
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
            "name": "loggingEnabled",
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
    "name": "MqttLogsBarEnableAuthMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttLogsBarEnableAuthMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "7601290fdcf55cbb2f69d8a5cd1b7dc8",
    "metadata": {},
    "name": "MqttLogsBarEnableAuthMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "98e87cdee0cb950da26dae6c84efd0ca";

export default node;
