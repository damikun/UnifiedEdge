/**
 * @generated SignedSource<<12439766214f4f253f62bf841c89038c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetServerLocationInput = {
  id: string;
  location: string;
};
export type ServerLocationUpdateMutation$variables = {
  input: SetServerLocationInput;
};
export type ServerLocationUpdateMutation$data = {
  readonly setServerLocation: {
    readonly gQL_IServer: {
      readonly id: string;
      readonly location: string | null;
    } | null;
  };
};
export type ServerLocationUpdateMutation = {
  response: ServerLocationUpdateMutation$data;
  variables: ServerLocationUpdateMutation$variables;
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
  "name": "location",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerLocationUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerLocationPayload",
        "kind": "LinkedField",
        "name": "setServerLocation",
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
    "name": "ServerLocationUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerLocationPayload",
        "kind": "LinkedField",
        "name": "setServerLocation",
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
    "cacheID": "a43a22c19084d9b0c2ec8eecf723d32f",
    "id": null,
    "metadata": {},
    "name": "ServerLocationUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ServerLocationUpdateMutation(\n  $input: SetServerLocationInput!\n) {\n  setServerLocation(input: $input) {\n    gQL_IServer {\n      __typename\n      id\n      location\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ba1f1f263b9567e31f69dd0b44e288a9";

export default node;
