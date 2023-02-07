/**
 * @generated SignedSource<<19f5f29e06f6d5dbaea40a169bc76a41>>
 * @relayHash 52342f1a7d8035b8cdcd1d3816cd5a15
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 52342f1a7d8035b8cdcd1d3816cd5a15

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetEdgeLocation2Input = {
  location2: string;
};
export type EdgeLocation2UpdateMutation$variables = {
  request: SetEdgeLocation2Input;
};
export type EdgeLocation2UpdateMutation$data = {
  readonly setEdgeLocation2: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_Edge: {
      readonly id: string;
      readonly location2: string | null;
    } | null;
  };
};
export type EdgeLocation2UpdateMutation = {
  response: EdgeLocation2UpdateMutation$data;
  variables: EdgeLocation2UpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "request"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "SetEdgeLocation2Payload",
    "kind": "LinkedField",
    "name": "setEdgeLocation2",
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
            "name": "location2",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
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
                  (v1/*: any*/)
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
              (v1/*: any*/)
            ],
            "type": "ResultError",
            "abstractKey": "__isResultError"
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
    "name": "EdgeLocation2UpdateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EdgeLocation2UpdateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "52342f1a7d8035b8cdcd1d3816cd5a15",
    "metadata": {},
    "name": "EdgeLocation2UpdateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2b7fa06c8d157f29421afb23c42fd278";

export default node;
