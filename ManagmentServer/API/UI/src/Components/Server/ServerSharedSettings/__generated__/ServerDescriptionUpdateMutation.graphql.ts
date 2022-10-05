/**
 * @generated SignedSource<<a9624815f2c02d263c23f4b8b7cd474a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetServerDescriptionInput = {
  description: string;
  id: string;
};
export type ServerDescriptionUpdateMutation$variables = {
  input: SetServerDescriptionInput;
};
export type ServerDescriptionUpdateMutation$data = {
  readonly setServerDescription: {
    readonly gQL_IServer: {
      readonly description: string | null;
      readonly id: string;
    } | null;
  };
};
export type ServerDescriptionUpdateMutation = {
  response: ServerDescriptionUpdateMutation$data;
  variables: ServerDescriptionUpdateMutation$variables;
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
  "name": "description",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerDescriptionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerDescriptionPayload",
        "kind": "LinkedField",
        "name": "setServerDescription",
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
    "name": "ServerDescriptionUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetServerDescriptionPayload",
        "kind": "LinkedField",
        "name": "setServerDescription",
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
    "cacheID": "f26456e7197fc54d43e267b56ff10575",
    "id": null,
    "metadata": {},
    "name": "ServerDescriptionUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ServerDescriptionUpdateMutation(\n  $input: SetServerDescriptionInput!\n) {\n  setServerDescription(input: $input) {\n    gQL_IServer {\n      __typename\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3b6a4027e390ca10a7947bc6f9c7e9b6";

export default node;
