/**
 * @generated SignedSource<<2b777323b13d26d87ca81c306e9860df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateWebHookUrlInput = {
  hook_id: string;
  url: string;
};
export type WebHookUrlSettingUpdateMutation$variables = {
  input: UpdateWebHookUrlInput;
};
export type WebHookUrlSettingUpdateMutation$data = {
  readonly updateWebHookUrl: {
    readonly gQL_WebHook: {
      readonly id: string;
      readonly webHookUrl: string;
    } | null;
  };
};
export type WebHookUrlSettingUpdateMutation = {
  response: WebHookUrlSettingUpdateMutation$data;
  variables: WebHookUrlSettingUpdateMutation$variables;
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
    "concreteType": "UpdateWebHookUrlPayload",
    "kind": "LinkedField",
    "name": "updateWebHookUrl",
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
            "name": "webHookUrl",
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
    "name": "WebHookUrlSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookUrlSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8cc29f11e54d0ac0134a8fa59ab09ad7",
    "id": null,
    "metadata": {},
    "name": "WebHookUrlSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookUrlSettingUpdateMutation(\n  $input: UpdateWebHookUrlInput!\n) {\n  updateWebHookUrl(input: $input) {\n    gQL_WebHook {\n      id\n      webHookUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5a640949b9d387f35f6d891088eeeb33";

export default node;
