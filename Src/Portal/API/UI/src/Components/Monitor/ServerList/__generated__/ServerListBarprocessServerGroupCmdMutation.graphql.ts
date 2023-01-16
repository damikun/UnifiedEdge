/**
 * @generated SignedSource<<0fe02fb0b0b6f095648d2d79c2b86014>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GQL_ServerGroupCmd = "START" | "STOP" | "%future added value";
export type GQL_ServerGroupResult = "DONE" | "DONE_WITH_ERRORS" | "FAILED" | "%future added value";
export type ProcessServerGroupCmdInput = {
  cmd: GQL_ServerGroupCmd;
};
export type ServerListBarprocessServerGroupCmdMutation$variables = {
  input: ProcessServerGroupCmdInput;
};
export type ServerListBarprocessServerGroupCmdMutation$data = {
  readonly processServerGroupCmd: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_ServerGroupResult: GQL_ServerGroupResult | null;
  };
};
export type ServerListBarprocessServerGroupCmdMutation = {
  response: ServerListBarprocessServerGroupCmdMutation$data;
  variables: ServerListBarprocessServerGroupCmdMutation$variables;
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
    "concreteType": "ProcessServerGroupCmdPayload",
    "kind": "LinkedField",
    "name": "processServerGroupCmd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gQL_ServerGroupResult",
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
    "name": "ServerListBarprocessServerGroupCmdMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerListBarprocessServerGroupCmdMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "96f52132fc054dc3f3af5f1346f38cd2",
    "id": null,
    "metadata": {},
    "name": "ServerListBarprocessServerGroupCmdMutation",
    "operationKind": "mutation",
    "text": "mutation ServerListBarprocessServerGroupCmdMutation(\n  $input: ProcessServerGroupCmdInput!\n) {\n  processServerGroupCmd(input: $input) {\n    gQL_ServerGroupResult\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e48cfda4762479203d08996aabce4ce3";

export default node;
