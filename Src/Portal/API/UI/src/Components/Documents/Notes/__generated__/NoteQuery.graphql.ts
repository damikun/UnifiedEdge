/**
 * @generated SignedSource<<2951344562cc89cd74fe00a1adee8227>>
 * @relayHash fece611effb70c672b7d0fc475c24e0e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fece611effb70c672b7d0fc475c24e0e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoteQuery$variables = {
  note_id: string;
};
export type NoteQuery$data = {
  readonly noteById: {
    readonly content: string | null;
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"NoteDataFragment" | "NoteHighlightSectionDataFragment" | "NoteNameSectionDataFragment" | "NoteUpdateSectionDataFragment" | "NoteVisibilitySectionDataFragment">;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
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
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteNameSectionDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteVisibilitySectionDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteHighlightSectionDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NoteUpdateSectionDataFragment"
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
          (v3/*: any*/),
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
    "id": "fece611effb70c672b7d0fc475c24e0e",
    "metadata": {},
    "name": "NoteQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1be2ea92b904b6bcc7501938ca336d7d";

export default node;
