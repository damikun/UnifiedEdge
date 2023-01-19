/**
 * @generated SignedSource<<154de1fc840eabb6c516fb124656cdec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateNoteNameInput = {
  name: string;
  noteId: string;
};
export type NoteNameSectionMutation$variables = {
  input: UpdateNoteNameInput;
};
export type NoteNameSectionMutation$data = {
  readonly updateNoteName: {
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
export type NoteNameSectionMutation = {
  response: NoteNameSectionMutation$data;
  variables: NoteNameSectionMutation$variables;
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
    "name": "NoteNameSectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateNoteNamePayload",
        "kind": "LinkedField",
        "name": "updateNoteName",
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
    "name": "NoteNameSectionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateNoteNamePayload",
        "kind": "LinkedField",
        "name": "updateNoteName",
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
    "cacheID": "2bc5bf0ad8159c0ed2d3607986d96361",
    "id": null,
    "metadata": {},
    "name": "NoteNameSectionMutation",
    "operationKind": "mutation",
    "text": "mutation NoteNameSectionMutation(\n  $input: UpdateNoteNameInput!\n) {\n  updateNoteName(input: $input) {\n    gQL_Note {\n      id\n      ...NoteDataFragment\n      ...NotesItemDataFragment\n    }\n    errors {\n      __typename\n      ... on ValidationError {\n        errors {\n          property\n          message\n        }\n      }\n      ... on ResultError {\n        __isResultError: __typename\n        message\n      }\n    }\n  }\n}\n\nfragment NoteDataFragment on GQL_Note {\n  id\n  name\n  content\n  isHighlighted\n  isPrivate\n  updated\n  updatedby {\n    firstName\n    lastName\n    userName\n    id\n  }\n}\n\nfragment NotesItemDataFragment on GQL_Note {\n  id\n  name\n  content\n  isHighlighted\n  isPrivate\n  updated\n  updatedby {\n    firstName\n    lastName\n    userName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "190394ae2711880d027ba93a379b3ab3";

export default node;
