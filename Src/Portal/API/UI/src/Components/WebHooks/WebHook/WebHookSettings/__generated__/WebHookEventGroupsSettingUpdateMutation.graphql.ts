/**
 * @generated SignedSource<<2d1c4435d82e6007e3e2c586287cff6b>>
 * @relayHash ccb72eaa67bcd69bec1e1308b6576863
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ccb72eaa67bcd69bec1e1308b6576863

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
export type UpdateWebHookEventGroupsInput = {
  groups: ReadonlyArray<HookEventGroup>;
  hook_id: string;
};
export type WebHookEventGroupsSettingUpdateMutation$variables = {
  input: UpdateWebHookEventGroupsInput;
};
export type WebHookEventGroupsSettingUpdateMutation$data = {
  readonly updateWebHookEventGroups: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_WebHook: {
      readonly eventGroup: ReadonlyArray<HookEventGroup>;
      readonly id: string;
    } | null;
  };
};
export type WebHookEventGroupsSettingUpdateMutation = {
  response: WebHookEventGroupsSettingUpdateMutation$data;
  variables: WebHookEventGroupsSettingUpdateMutation$variables;
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
    "concreteType": "UpdateWebHookEventGroupsPayload",
    "kind": "LinkedField",
    "name": "updateWebHookEventGroups",
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
            "name": "eventGroup",
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
    "name": "WebHookEventGroupsSettingUpdateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookEventGroupsSettingUpdateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "ccb72eaa67bcd69bec1e1308b6576863",
    "metadata": {},
    "name": "WebHookEventGroupsSettingUpdateMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "4ea2895f0449cddff12604f8c3c8989a";

export default node;
