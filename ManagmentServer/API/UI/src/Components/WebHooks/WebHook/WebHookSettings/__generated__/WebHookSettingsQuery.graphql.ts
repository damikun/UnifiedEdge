/**
 * @generated SignedSource<<0561f5c1561d3a23f1fe7b9cffb7183f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "1cfd18cb3049519bea6c33cf2d7f37a0",
    "id": null,
    "metadata": {},
    "name": "WebHookSettingsQuery",
    "operationKind": "query",
    "text": "query WebHookSettingsQuery(\n  $hook_id: ID!\n) {\n  webHookById(hook_id: $hook_id) {\n    id\n    ...WebHookNameSettingDataFragment\n    ...WebHookUrlSettingDataFragment\n    ...WebHookSecretSettingDataFragment\n    ...WebHookActivSettingDataFragment\n    ...WebHookEventGroupsSettingDataFragment\n    ...WebHookRemoveDataFragment\n  }\n}\n\nfragment WebHookActivSettingDataFragment on GQL_WebHook {\n  id\n  isActive\n}\n\nfragment WebHookEventGroupsSettingDataFragment on GQL_WebHook {\n  id\n  eventGroup\n}\n\nfragment WebHookNameSettingDataFragment on GQL_WebHook {\n  id\n  name\n}\n\nfragment WebHookRemoveDataFragment on GQL_WebHook {\n  id\n}\n\nfragment WebHookSecretSettingDataFragment on GQL_WebHook {\n  id\n  secret\n}\n\nfragment WebHookUrlSettingDataFragment on GQL_WebHook {\n  id\n  webHookUrl\n}\n"
  }
};
})();

(node as any).hash = "82255d987741ebe0dd02903d3d244f83";

export default node;
