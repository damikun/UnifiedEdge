/**
 * @generated SignedSource<<36cc6956d5aafca481f0c851bd500992>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
v1 = [
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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookEventGroupsSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c57621f043d7607f56f65324092ca926",
    "id": null,
    "metadata": {},
    "name": "WebHookEventGroupsSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookEventGroupsSettingUpdateMutation(\n  $input: UpdateWebHookEventGroupsInput!\n) {\n  updateWebHookEventGroups(input: $input) {\n    gQL_WebHook {\n      id\n      eventGroup\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd34231ba05378355acfedad9a7f12da";

export default node;
