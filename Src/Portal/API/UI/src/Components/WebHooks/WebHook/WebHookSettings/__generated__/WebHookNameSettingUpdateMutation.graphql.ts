/**
 * @generated SignedSource<<d8fe98c39af19621a2071a733933c50b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateWebHookNameInput = {
  hook_id: string;
  name: string;
};
export type WebHookNameSettingUpdateMutation$variables = {
  input: UpdateWebHookNameInput;
};
export type WebHookNameSettingUpdateMutation$data = {
  readonly updateWebHookName: {
    readonly gQL_WebHook: {
      readonly id: string;
      readonly name: string;
    } | null;
  };
};
export type WebHookNameSettingUpdateMutation = {
  response: WebHookNameSettingUpdateMutation$data;
  variables: WebHookNameSettingUpdateMutation$variables;
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
    "concreteType": "UpdateWebHookNamePayload",
    "kind": "LinkedField",
    "name": "updateWebHookName",
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
            "name": "name",
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
    "name": "WebHookNameSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookNameSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a7fbf993fa8c86060d722c8a92909e87",
    "id": null,
    "metadata": {},
    "name": "WebHookNameSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookNameSettingUpdateMutation(\n  $input: UpdateWebHookNameInput!\n) {\n  updateWebHookName(input: $input) {\n    gQL_WebHook {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8eabab51ec6fbe180645c2c8ec0d26d8";

export default node;
