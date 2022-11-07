/**
 * @generated SignedSource<<637d4124ffd4ba604fb10a4d793e56bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeNameInput = {
  name: string;
};
export type EdgeNameUpdateMutation$variables = {
  request: SetEdgeNameInput;
};
export type EdgeNameUpdateMutation$data = {
  readonly setEdgeName: {
    readonly gQL_Edge: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type EdgeNameUpdateMutation = {
  response: EdgeNameUpdateMutation$data;
  variables: EdgeNameUpdateMutation$variables;
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
    "concreteType": "SetEdgeNamePayload",
    "kind": "LinkedField",
    "name": "setEdgeName",
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
            "name": "name",
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
    "name": "EdgeNameUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeNameUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4ed007031351309c349f2d6368b951b1",
    "id": null,
    "metadata": {},
    "name": "EdgeNameUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EdgeNameUpdateMutation(\n  $request: SetEdgeNameInput!\n) {\n  setEdgeName(request: $request) {\n    gQL_Edge {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "505915fac302eff28213fb67294ba33a";

export default node;
