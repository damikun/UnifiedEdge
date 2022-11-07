/**
 * @generated SignedSource<<457c721342de8e4a25003d30f0e72c88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeLocation1Input = {
  location1: string;
};
export type EdgeLocation1UpdateMutation$variables = {
  request: SetEdgeLocation1Input;
};
export type EdgeLocation1UpdateMutation$data = {
  readonly setEdgeLocation1: {
    readonly gQL_Edge: {
      readonly id: string;
      readonly location1: string | null;
    } | null;
  };
};
export type EdgeLocation1UpdateMutation = {
  response: EdgeLocation1UpdateMutation$data;
  variables: EdgeLocation1UpdateMutation$variables;
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
    "concreteType": "SetEdgeLocation1Payload",
    "kind": "LinkedField",
    "name": "setEdgeLocation1",
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
            "name": "location1",
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
    "name": "EdgeLocation1UpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeLocation1UpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "144a9dec527512d530310f225142fa25",
    "id": null,
    "metadata": {},
    "name": "EdgeLocation1UpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EdgeLocation1UpdateMutation(\n  $request: SetEdgeLocation1Input!\n) {\n  setEdgeLocation1(request: $request) {\n    gQL_Edge {\n      id\n      location1\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ddcb20ee685400c64d5b3b424e9686c";

export default node;
