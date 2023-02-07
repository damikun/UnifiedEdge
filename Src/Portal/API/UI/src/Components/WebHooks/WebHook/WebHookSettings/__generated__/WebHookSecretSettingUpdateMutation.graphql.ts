/**
 * @generated SignedSource<<bc317da21c966db9d6f21d6c20cbba3c>>
 * @relayHash 82eea9c0270f5179c505bbcfcd1418ac
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 82eea9c0270f5179c505bbcfcd1418ac

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateWebHookSecretInput = {
  hook_id: string;
  secret: string;
};
export type WebHookSecretSettingUpdateMutation$variables = {
  input: UpdateWebHookSecretInput;
};
export type WebHookSecretSettingUpdateMutation$data = {
  readonly updateWebHookSecret: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_WebHook: {
      readonly id: string;
      readonly secret: string | null;
    } | null;
  };
};
export type WebHookSecretSettingUpdateMutation = {
  response: WebHookSecretSettingUpdateMutation$data;
  variables: WebHookSecretSettingUpdateMutation$variables;
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
    "concreteType": "UpdateWebHookSecretPayload",
    "kind": "LinkedField",
    "name": "updateWebHookSecret",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "gQL_WebHook",
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
            "name": "secret",
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
    "name": "WebHookSecretSettingUpdateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookSecretSettingUpdateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "82eea9c0270f5179c505bbcfcd1418ac",
    "metadata": {},
    "name": "WebHookSecretSettingUpdateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "7b84443934e7f42e987ec64195e7e76c";

export default node;
