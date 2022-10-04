/**
 * @generated SignedSource<<dcad994f0966ffb8ee5067abb5a0d262>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeDescriptionInput = {
  description: string;
};
export type EdgeDescriptionUpdateMutation$variables = {
  request: SetEdgeDescriptionInput;
};
export type EdgeDescriptionUpdateMutation$data = {
  readonly setEdgeDescription: {
    readonly gQL_Edge: {
      readonly description: string | null;
      readonly id: string;
    } | null;
  };
};
export type EdgeDescriptionUpdateMutation = {
  response: EdgeDescriptionUpdateMutation$data;
  variables: EdgeDescriptionUpdateMutation$variables;
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
    "concreteType": "SetEdgeDescriptionPayload",
    "kind": "LinkedField",
    "name": "setEdgeDescription",
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
            "name": "description",
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
    "name": "EdgeDescriptionUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeDescriptionUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8d3c8dd7ebae939143308909c9101f2d",
    "id": null,
    "metadata": {},
    "name": "EdgeDescriptionUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EdgeDescriptionUpdateMutation(\n  $request: SetEdgeDescriptionInput!\n) {\n  setEdgeDescription(request: $request) {\n    gQL_Edge {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d51d60da4f9e4fd1aeaab5d4c39118e6";

export default node;
