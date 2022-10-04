/**
 * @generated SignedSource<<771982e27421f3c7d0b39e5fe038fe4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeLocation2Input = {
  location2: string;
};
export type EdgeLocation2UpdateMutation$variables = {
  request: SetEdgeLocation2Input;
};
export type EdgeLocation2UpdateMutation$data = {
  readonly setEdgeLocation2: {
    readonly gQL_Edge: {
      readonly id: string;
      readonly location2: string | null;
    } | null;
  };
};
export type EdgeLocation2UpdateMutation = {
  response: EdgeLocation2UpdateMutation$data;
  variables: EdgeLocation2UpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "SetEdgeLocation2Payload",
    "kind": "LinkedField",
    "name": "setEdgeLocation2",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "gQL_Edge",
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
            "name": "location2",
            "storageKey": null
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
    "name": "EdgeLocation2UpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeLocation2UpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ec3e8a83314635162e0a916c28f983f4",
    "id": null,
    "metadata": {},
    "name": "EdgeLocation2UpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EdgeLocation2UpdateMutation(\n  $request: SetEdgeLocation2Input!\n) {\n  setEdgeLocation2(request: $request) {\n    gQL_Edge {\n      id\n      location2\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e5207ef393d458ee21cb9b71972bb41";

export default node;
