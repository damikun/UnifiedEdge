/**
 * @generated SignedSource<<6636cad630c9d307745d2dfdd3599553>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeLocation3Input = {
  location3: string;
};
export type EdgeLocation3UpdateMutation$variables = {
  request: SetEdgeLocation3Input;
};
export type EdgeLocation3UpdateMutation$data = {
  readonly setEdgeLocation3: {
    readonly gQL_Edge: {
      readonly id: string;
      readonly location3: string | null;
    } | null;
  };
};
export type EdgeLocation3UpdateMutation = {
  response: EdgeLocation3UpdateMutation$data;
  variables: EdgeLocation3UpdateMutation$variables;
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
    "concreteType": "SetEdgeLocation3Payload",
    "kind": "LinkedField",
    "name": "setEdgeLocation3",
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
            "name": "location3",
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
    "name": "EdgeLocation3UpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeLocation3UpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9942882558605f2db66fbcddfc003b5f",
    "id": null,
    "metadata": {},
    "name": "EdgeLocation3UpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EdgeLocation3UpdateMutation(\n  $request: SetEdgeLocation3Input!\n) {\n  setEdgeLocation3(request: $request) {\n    gQL_Edge {\n      id\n      location3\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "89f0e3dbc2ac9ea15c002ff0f257cd52";

export default node;
