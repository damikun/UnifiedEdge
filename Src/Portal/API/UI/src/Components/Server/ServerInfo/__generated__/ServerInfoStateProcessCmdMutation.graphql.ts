/**
 * @generated SignedSource<<19be43b0dba752a2f92594dbab70f46e>>
 * @relayHash 77482b3d0c2ea904f58e7138c4466cff
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 77482b3d0c2ea904f58e7138c4466cff

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GQL_ServerCmd = "RESTART" | "START" | "STOP" | "%future added value";
export type GQL_ServerState = "DISABLED" | "RESTARTING" | "STARTED" | "STARTING" | "STOPPED" | "STOPPING" | "UNDEFINED" | "%future added value";
export type ProcessServerCmdInput = {
  cmd: GQL_ServerCmd;
  uid: string;
};
export type ServerInfoStateProcessCmdMutation$variables = {
  input: ProcessServerCmdInput;
};
export type ServerInfoStateProcessCmdMutation$data = {
  readonly processServerCmd: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_ServerState: GQL_ServerState | null;
  };
};
export type ServerInfoStateProcessCmdMutation = {
  response: ServerInfoStateProcessCmdMutation$data;
  variables: ServerInfoStateProcessCmdMutation$variables;
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
    "concreteType": "ProcessServerCmdPayload",
    "kind": "LinkedField",
    "name": "processServerCmd",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "gQL_ServerState",
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
    "name": "ServerInfoStateProcessCmdMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerInfoStateProcessCmdMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "77482b3d0c2ea904f58e7138c4466cff",
    "metadata": {},
    "name": "ServerInfoStateProcessCmdMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ca2cbb4f90a69b3879c92241e182d595";

export default node;
