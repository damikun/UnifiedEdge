/**
 * @generated SignedSource<<9b4d3cfb2f143d5a9ddcb53e9a19e8c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetServerNameInput = {
  id: string;
  name: string;
};
export type ServerNameUpdateMutation$variables = {
  input: SetServerNameInput;
};
export type ServerNameUpdateMutation$data = {
  readonly setServerName: {
    readonly gQL_IServer: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type ServerNameUpdateMutation = {
  response: ServerNameUpdateMutation$data;
  variables: ServerNameUpdateMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerNameUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerNamePayload",
        "kind": "LinkedField",
        "name": "setServerName",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "gQL_IServer",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "ServerNameUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerNamePayload",
        "kind": "LinkedField",
        "name": "setServerName",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "gQL_IServer",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b6e647b330c0d950a10ef318bfebc000",
    "id": null,
    "metadata": {},
    "name": "ServerNameUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ServerNameUpdateMutation(\n  $input: SetServerNameInput!\n) {\n  setServerName(input: $input) {\n    gQL_IServer {\n      __typename\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1930c0fc6defcf16eb2422584b3bb5e";

export default node;
