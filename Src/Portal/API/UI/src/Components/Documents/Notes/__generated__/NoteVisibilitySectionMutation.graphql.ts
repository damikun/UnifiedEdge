/**
 * @generated SignedSource<<7900518207b96c68ba8a43cd405c7c40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SetNotePublicInput = {
  isPrivate: boolean;
  noteId: string;
};
export type NoteVisibilitySectionMutation$variables = {
  input: SetNotePublicInput;
};
export type NoteVisibilitySectionMutation$data = {
  readonly setNotePublic: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_Note: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"NoteDataFragment" | "NotesItemDataFragment">;
    } | null;
  };
};
export type NoteVisibilitySectionMutation = {
  response: NoteVisibilitySectionMutation$data;
  variables: NoteVisibilitySectionMutation$variables;
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
  "name": "message",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ErrorSource",
          "kind": "LinkedField",
          "name": "errors",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "property",
              "storageKey": null
            },
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "ValidationError",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v3/*: any*/)
      ],
      "type": "ResultError",
      "abstractKey": "__isResultError"
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NoteVisibilitySectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetNotePublicPayload",
        "kind": "LinkedField",
        "name": "setNotePublic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_Note",
            "kind": "LinkedField",
            "name": "gQL_Note",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NoteDataFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NotesItemDataFragment"
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
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
    "name": "NoteVisibilitySectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SetNotePublicPayload",
        "kind": "LinkedField",
        "name": "setNotePublic",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_Note",
            "kind": "LinkedField",
            "name": "gQL_Note",
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
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d74da7b85ca3fcc7a48dd6f23f5482c",
    "id": null,
    "metadata": {},
    "name": "NoteVisibilitySectionMutation",
    "operationKind": "mutation",
    "text": "mutation NoteVisibilitySectionMutation(\n  $input: SetNotePublicInput!\n) {\n  setNotePublic(input: $input) {\n    gQL_Note {\n      id\n      ...NoteDataFragment\n      ...NotesItemDataFragment\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n\nfragment NoteDataFragment on GQL_Note {\n  id\n  name\n  content\n  isHighlighted\n  isPrivate\n  updated\n  updatedby {\n    firstName\n    lastName\n    userName\n    id\n  }\n}\n\nfragment NotesItemDataFragment on GQL_Note {\n  id\n  name\n  content\n  isHighlighted\n  isPrivate\n  updated\n  updatedby {\n    firstName\n    lastName\n    userName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5e0beb886ed98d8585988ec7ccdbd21c";

export default node;
