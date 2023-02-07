/**
 * @generated SignedSource<<d3eb4c00732ec8d5d4084f4deef20628>>
 * @relayHash 6c3f2ad6853ab952f2da8014bced36b5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6c3f2ad6853ab952f2da8014bced36b5

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserEnabledInput = {
  enable: boolean;
  user_id: string;
};
export type UserActivSettingUpdateMutation$variables = {
  input: UpdateUserEnabledInput;
};
export type UserActivSettingUpdateMutation$data = {
  readonly updateUserEnabled: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_User: {
      readonly enabled: boolean;
      readonly id: string;
    } | null;
  };
};
export type UserActivSettingUpdateMutation = {
  response: UserActivSettingUpdateMutation$data;
  variables: UserActivSettingUpdateMutation$variables;
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
    "concreteType": "UpdateUserEnabledPayload",
    "kind": "LinkedField",
    "name": "updateUserEnabled",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "gQL_User",
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
            "name": "enabled",
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
    "name": "UserActivSettingUpdateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserActivSettingUpdateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "6c3f2ad6853ab952f2da8014bced36b5",
    "metadata": {},
    "name": "UserActivSettingUpdateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e5f0a2d47806f7df4f6d623e0e1c6efc";

export default node;
