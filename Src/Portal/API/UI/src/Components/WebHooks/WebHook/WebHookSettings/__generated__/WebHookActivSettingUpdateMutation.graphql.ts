/**
 * @generated SignedSource<<cb1660487d2a7cb8e9d2d7683e4566e3>>
 * @relayHash debdb2e679eeabe330686c3d647726f3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID debdb2e679eeabe330686c3d647726f3

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateWebHookActiveStateInput = {
  activ: boolean;
  hook_id: string;
};
export type WebHookActivSettingUpdateMutation$variables = {
  input: UpdateWebHookActiveStateInput;
};
export type WebHookActivSettingUpdateMutation$data = {
  readonly updateWebHookActiveState: {
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
      readonly isActive: boolean;
    } | null;
  };
};
export type WebHookActivSettingUpdateMutation = {
  response: WebHookActivSettingUpdateMutation$data;
  variables: WebHookActivSettingUpdateMutation$variables;
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
    "concreteType": "UpdateWebHookActiveStatePayload",
    "kind": "LinkedField",
    "name": "updateWebHookActiveState",
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
            "name": "isActive",
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
    "name": "WebHookActivSettingUpdateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookActivSettingUpdateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "debdb2e679eeabe330686c3d647726f3",
    "metadata": {},
    "name": "WebHookActivSettingUpdateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "37ae676fe2dd97fdd7bba8f19ece1f76";

export default node;
