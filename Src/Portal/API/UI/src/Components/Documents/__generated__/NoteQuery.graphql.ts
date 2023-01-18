/**
 * @generated SignedSource<<2e7a233669918ad564500af439e2c5f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteQuery$variables = {
  note_id: string;
};
export type NoteQuery$data = {
  readonly noteById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"NoteDataFragment">;
  };
};
export type NoteQuery = {
  response: NoteQuery$data;
  variables: NoteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "note_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "note_id",
    "variableName": "note_id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NoteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_Note",
        "kind": "LinkedField",
        "name": "noteById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteDataFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NoteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_Note",
        "kind": "LinkedField",
        "name": "noteById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isHighlighted",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPrivate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "updated",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_User",
            "kind": "LinkedField",
            "name": "updatedby",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "userName",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d41a9a0e8b6db7d466746f8356da540",
    "id": null,
    "metadata": {},
    "name": "NoteQuery",
    "operationKind": "query",
    "text": "query NoteQuery(\n  $note_id: ID!\n) {\n  noteById(note_id: $note_id) {\n    id\n    ...NoteDataFragment\n  }\n}\n\nfragment NoteDataFragment on GQL_Note {\n  id\n  name\n  content\n  isHighlighted\n  isPrivate\n  updated\n  updatedby {\n    firstName\n    lastName\n    userName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1bf5194a559f20c329716e964a2aa226";

export default node;
