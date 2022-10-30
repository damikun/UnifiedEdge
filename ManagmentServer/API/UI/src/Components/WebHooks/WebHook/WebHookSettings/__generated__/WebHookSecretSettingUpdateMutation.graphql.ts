/**
 * @generated SignedSource<<e334d26baeabbe9ef1490a2a4e7ad5da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookSecretSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d688acd35fbd0c22648a17195f179797",
    "id": null,
    "metadata": {},
    "name": "WebHookSecretSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookSecretSettingUpdateMutation(\n  $input: UpdateWebHookSecretInput!\n) {\n  updateWebHookSecret(input: $input) {\n    gQL_WebHook {\n      id\n      secret\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8708e824eca32d9aa8aae77ac4329252";

export default node;
