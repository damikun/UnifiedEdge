/**
 * @generated SignedSource<<246c56837eb4977d426243c7396c06a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
export type CreateWebHookInput = {
  groups: ReadonlyArray<HookEventGroup>;
  name: string;
  secret?: string | null;
  server_id?: string | null;
  url: string;
};
export type WebHookCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateWebHookInput;
};
export type WebHookCreateMutation$data = {
  readonly createWebHook: {
    readonly gQL_WebHook: {
      readonly " $fragmentSpreads": FragmentRefs<"WebHookListItemDataFragment">;
    } | null;
  };
};
export type WebHookCreateMutation = {
  response: WebHookCreateMutation$data;
  variables: WebHookCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WebHookCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateWebHookPayload",
        "kind": "LinkedField",
        "name": "createWebHook",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "WebHookListItemDataFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "WebHookCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateWebHookPayload",
        "kind": "LinkedField",
        "name": "createWebHook",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contentType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "eventGroup",
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
                "name": "lastTrigger",
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
                "name": "webHookUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "serverUid",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "gQL_WebHook",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_WebHook"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "134f7cb0972b18939c556331b629f112",
    "id": null,
    "metadata": {},
    "name": "WebHookCreateMutation",
    "operationKind": "mutation",
    "text": "mutation WebHookCreateMutation(\n  $input: CreateWebHookInput!\n) {\n  createWebHook(input: $input) {\n    gQL_WebHook {\n      ...WebHookListItemDataFragment\n      id\n    }\n  }\n}\n\nfragment WebHookListItemDataFragment on GQL_WebHook {\n  id\n  name\n  contentType\n  eventGroup\n  isActive\n  lastTrigger\n  secret\n  webHookUrl\n  serverUid\n}\n"
  }
};
})();

(node as any).hash = "3467e2769e3e82ec1494f9e9ef4266ac";

export default node;
