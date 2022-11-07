/**
 * @generated SignedSource<<f2a4dc386bdf857e1f18c90b8a3793d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveServerInput = {
  id: string;
};
export type ServerRemoveUpdateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: RemoveServerInput;
};
export type ServerRemoveUpdateMutation$data = {
  readonly removeServer: {
    readonly removed_id: string | null;
  };
};
export type ServerRemoveUpdateMutation = {
  response: ServerRemoveUpdateMutation$data;
  variables: ServerRemoveUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "removed_id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerRemoveUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveServerPayload",
        "kind": "LinkedField",
        "name": "removeServer",
        "plural": false,
        "selections": [
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ServerRemoveUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveServerPayload",
        "kind": "LinkedField",
        "name": "removeServer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "removed_id",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b6e33fb65b04a0a33e1bea47d6006e0d",
    "id": null,
    "metadata": {},
    "name": "ServerRemoveUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ServerRemoveUpdateMutation(\n  $input: RemoveServerInput!\n) {\n  removeServer(input: $input) {\n    removed_id\n  }\n}\n"
  }
};
})();

(node as any).hash = "598aab2af79cf4be137e319d6f52be1f";

export default node;
