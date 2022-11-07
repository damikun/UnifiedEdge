/**
 * @generated SignedSource<<cb95635bc7ef5543a8289e11d3abe874>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerInfoStateProcessCmdMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "390d4d3c324fbf029ce143f8ce154751",
    "id": null,
    "metadata": {},
    "name": "ServerInfoStateProcessCmdMutation",
    "operationKind": "mutation",
    "text": "mutation ServerInfoStateProcessCmdMutation(\n  $input: ProcessServerCmdInput!\n) {\n  processServerCmd(input: $input) {\n    gQL_ServerState\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e5a690a1de76e485d69018bb9da2151";

export default node;
