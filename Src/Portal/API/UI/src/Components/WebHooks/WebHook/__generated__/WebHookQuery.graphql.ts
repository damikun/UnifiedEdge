/**
 * @generated SignedSource<<a4c8c24048ff77e99f0521ee82853cc9>>
 * @relayHash 7a66fcc04bfc145f48000bb0a64bac46
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7a66fcc04bfc145f48000bb0a64bac46

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
    "id": "7a66fcc04bfc145f48000bb0a64bac46",
    "metadata": {},
    "name": "WebHookQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a498a786c658c442f7029eef390a5b7c";

export default node;
