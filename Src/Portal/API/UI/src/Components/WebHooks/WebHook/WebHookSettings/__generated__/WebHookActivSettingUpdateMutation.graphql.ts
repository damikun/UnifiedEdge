/**
 * @generated SignedSource<<a6d0b33bc56f716c2b5203074ba2130e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookActivSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d0cafe4626eba0d6f6e35dd4f5dc92db",
    "id": null,
    "metadata": {},
    "name": "WebHookActivSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookActivSettingUpdateMutation(\n  $input: UpdateWebHookActiveStateInput!\n) {\n  updateWebHookActiveState(input: $input) {\n    gQL_WebHook {\n      id\n      isActive\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a54ec7888a604338085f7a5d3e00e4a2";

export default node;
