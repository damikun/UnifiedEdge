/**
 * @generated SignedSource<<1323a06aafd86b653d497a75a9a03ebb>>
 * @relayHash 4a7daaa8d6d244040626141e8e2f4c83
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4a7daaa8d6d244040626141e8e2f4c83

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EnableGraphqlApiInput = {
  enable: boolean;
};
export type ApiInfoGraphqlEnableMutation$variables = {
  input: EnableGraphqlApiInput;
};
export type ApiInfoGraphqlEnableMutation$data = {
  readonly enableGraphqlApi: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_Edge: {
      readonly apiGraphql: boolean;
      readonly id: string;
    } | null;
  };
};
export type ApiInfoGraphqlEnableMutation = {
  response: ApiInfoGraphqlEnableMutation$data;
  variables: ApiInfoGraphqlEnableMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
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
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EnableGraphqlApiPayload",
    "kind": "LinkedField",
    "name": "enableGraphqlApi",
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
            "name": "apiGraphql",
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
    "name": "ApiInfoGraphqlEnableMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ApiInfoGraphqlEnableMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "4a7daaa8d6d244040626141e8e2f4c83",
    "metadata": {},
    "name": "ApiInfoGraphqlEnableMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c8ea4060e7a3ee6ba3d93cd17b56591e";

export default node;
