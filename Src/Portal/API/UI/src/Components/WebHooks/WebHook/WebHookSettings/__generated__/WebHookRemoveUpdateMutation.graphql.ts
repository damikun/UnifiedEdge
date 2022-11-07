/**
 * @generated SignedSource<<8bfacbf5f08a0560319fdd101e127916>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveWebHookInput = {
  hook_id: string;
};
export type WebHookRemoveUpdateMutation$variables = {
  input: RemoveWebHookInput;
};
export type WebHookRemoveUpdateMutation$data = {
  readonly removeWebHook: {
    readonly gQL_WebHook: {
      readonly id: string;
    } | null;
  };
};
export type WebHookRemoveUpdateMutation = {
  response: WebHookRemoveUpdateMutation$data;
  variables: WebHookRemoveUpdateMutation$variables;
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
    "concreteType": "RemoveWebHookPayload",
    "kind": "LinkedField",
    "name": "removeWebHook",
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
    "name": "WebHookRemoveUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookRemoveUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "147ffa3e851a735c6a01fd95ea44fcda",
    "id": null,
    "metadata": {},
    "name": "WebHookRemoveUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookRemoveUpdateMutation(\n  $input: RemoveWebHookInput!\n) {\n  removeWebHook(input: $input) {\n    gQL_WebHook {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "099dafdb2d8c84046762d56a829639e6";

export default node;
