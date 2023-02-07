/**
 * @generated SignedSource<<13a22953bab98c902a958d174524d216>>
 * @relayHash 1cfd18cb3049519bea6c33cf2d7f37a0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1cfd18cb3049519bea6c33cf2d7f37a0

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookSettingsQuery$variables = {
  hook_id: string;
};
export type WebHookSettingsQuery$data = {
  readonly webHookById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"WebHookActivSettingDataFragment" | "WebHookEventGroupsSettingDataFragment" | "WebHookNameSettingDataFragment" | "WebHookRemoveDataFragment" | "WebHookSecretSettingDataFragment" | "WebHookUrlSettingDataFragment">;
  };
};
export type WebHookSettingsQuery = {
  response: WebHookSettingsQuery$data;
  variables: WebHookSettingsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hook_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "hook_id",
    "variableName": "hook_id"
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
    "name": "WebHookSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookNameSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookUrlSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookSecretSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookActivSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookEventGroupsSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookRemoveDataFragment"
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
    "name": "WebHookSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
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
            "name": "webHookUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "secret",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isActive",
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
      }
    ]
  },
  "params": {
    "id": "1cfd18cb3049519bea6c33cf2d7f37a0",
    "metadata": {},
    "name": "WebHookSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "82255d987741ebe0dd02903d3d244f83";

export default node;
