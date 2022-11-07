/**
 * @generated SignedSource<<948582862dee677f566984fd8c74af2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookQuery$variables = {
  hook_id: string;
};
export type WebHookQuery$data = {
  readonly webHookById: {
    readonly " $fragmentSpreads": FragmentRefs<"WebHookInfoBarDataFragment">;
  };
};
export type WebHookQuery = {
  response: WebHookQuery$data;
  variables: WebHookQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WebHookQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookInfoBarDataFragment"
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
    "name": "WebHookQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
        "plural": false,
        "selections": [
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
            "name": "lastTrigger",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7a66fcc04bfc145f48000bb0a64bac46",
    "id": null,
    "metadata": {},
    "name": "WebHookQuery",
    "operationKind": "query",
    "text": "query WebHookQuery(\n  $hook_id: ID!\n) {\n  webHookById(hook_id: $hook_id) {\n    ...WebHookInfoBarDataFragment\n    id\n  }\n}\n\nfragment WebHookActivDataFragment on GQL_WebHook {\n  isActive\n}\n\nfragment WebHookInfoBarDataFragment on GQL_WebHook {\n  ...WebHookNameDataFragment\n  ...WebHookLastRunDataFragment\n  ...WebHookActivDataFragment\n}\n\nfragment WebHookLastRunDataFragment on GQL_WebHook {\n  lastTrigger\n}\n\nfragment WebHookNameDataFragment on GQL_WebHook {\n  name\n}\n"
  }
};
})();

(node as any).hash = "a498a786c658c442f7029eef390a5b7c";

export default node;
