/**
 * @generated SignedSource<<060977239eb72d917616d32508b1b072>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetMqttAuthUserPasswordInput = {
  authUserId: string;
  password: string;
};
export type MqttAuthUserDetailUpdatePasswordMutation$variables = {
  input: SetMqttAuthUserPasswordInput;
};
export type MqttAuthUserDetailUpdatePasswordMutation$data = {
  readonly setMqttAuthUserPassword: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttAuthUser: {
      readonly id: string;
    } | null;
  };
};
export type MqttAuthUserDetailUpdatePasswordMutation = {
  response: MqttAuthUserDetailUpdatePasswordMutation$data;
  variables: MqttAuthUserDetailUpdatePasswordMutation$variables;
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
    "concreteType": "SetMqttAuthUserPasswordPayload",
    "kind": "LinkedField",
    "name": "setMqttAuthUserPassword",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttAuthUser",
        "kind": "LinkedField",
        "name": "gQL_MqttAuthUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "MqttAuthUserDetailUpdatePasswordMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttAuthUserDetailUpdatePasswordMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "cf1f65bf3d8a52ca03c8f246db58834b",
    "id": null,
    "metadata": {},
    "name": "MqttAuthUserDetailUpdatePasswordMutation",
    "operationKind": "mutation",
    "text": "mutation MqttAuthUserDetailUpdatePasswordMutation(\n  $input: SetMqttAuthUserPasswordInput!\n) {\n  setMqttAuthUserPassword(input: $input) {\n    gQL_MqttAuthUser {\n      id\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8a6ce5930076640998f358461fd82e8e";

export default node;
