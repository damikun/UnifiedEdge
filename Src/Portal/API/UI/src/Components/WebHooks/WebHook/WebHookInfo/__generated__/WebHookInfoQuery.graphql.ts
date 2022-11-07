/**
 * @generated SignedSource<<0170dad91a67d3aa665978cbbc560fe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookInfoQuery$variables = {
  id: string;
};
export type WebHookInfoQuery$data = {
  readonly webHookById: {
    readonly " $fragmentSpreads": FragmentRefs<"WebHookGeneralInfoFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"WebHookRecordListPaginationFragment">;
};
export type WebHookInfoQuery = {
  response: WebHookInfoQuery$data;
  variables: WebHookInfoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "kind": "Variable",
  "name": "hook_id",
  "variableName": "id"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v1/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WebHookInfoQuery",
    "selections": [
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "WebHookRecordListPaginationFragment"
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WebHookGeneralInfoFragment"
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
    "name": "WebHookInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_WebHookRecordConnection",
        "kind": "LinkedField",
        "name": "webHookRecords",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_WebHookRecordEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_WebHookRecord",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "result",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hookEventGroup",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "guid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "timestamp",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "statusCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "hook_id"
        ],
        "handle": "connection",
        "key": "WebHookRecordListPaginationFragmentConnection_webHookRecords",
        "kind": "LinkedHandle",
        "name": "webHookRecords"
      },
      (v5/*: any*/),
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_WebHook",
        "kind": "LinkedField",
        "name": "webHookById",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "uid",
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
            "name": "eventGroup",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "83aeee85133d810b1b4346a6d86b1fd5",
    "id": null,
    "metadata": {},
    "name": "WebHookInfoQuery",
    "operationKind": "query",
    "text": "query WebHookInfoQuery(\n  $id: ID!\n) {\n  ...WebHookRecordListPaginationFragment_3Fa7W6\n  webHookById(hook_id: $id) {\n    ...WebHookGeneralInfoFragment\n    id\n  }\n}\n\nfragment WebHookGeneralInfoFragment on GQL_WebHook {\n  id\n  uid\n  webHookUrl\n  eventGroup\n}\n\nfragment WebHookRecordItemDataFragment on GQL_WebHookRecord {\n  id\n  result\n  hookEventGroup\n  guid\n  timestamp\n  statusCode\n}\n\nfragment WebHookRecordListPaginationFragment_3Fa7W6 on Query {\n  webHookRecords(hook_id: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...WebHookRecordItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c2d1315c740e80dcb3f8b689e2a9ff2b";

export default node;
