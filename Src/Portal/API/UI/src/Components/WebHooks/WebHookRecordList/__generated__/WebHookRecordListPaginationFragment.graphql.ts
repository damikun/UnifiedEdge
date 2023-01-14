/**
 * @generated SignedSource<<0ab3c01cbe5a4857ce3b3d4634f7955d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WebHookRecordListPaginationFragment$data = {
  readonly __id: string;
  readonly webHookRecords: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"WebHookRecordItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "WebHookRecordListPaginationFragment";
};
export type WebHookRecordListPaginationFragment$key = {
  readonly " $data"?: WebHookRecordListPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookRecordListPaginationFragment">;
};

import WebHookRecordListPaginationFragmentRefetchQuery_graphql from './WebHookRecordListPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "webHookRecords"
],
v1 = {
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 20,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "hook_id"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": WebHookRecordListPaginationFragmentRefetchQuery_graphql
    }
  },
  "name": "WebHookRecordListPaginationFragment",
  "selections": [
    {
      "alias": "webHookRecords",
      "args": [
        {
          "kind": "Variable",
          "name": "hook_id",
          "variableName": "hook_id"
        }
      ],
      "concreteType": "GQL_WebHookRecordConnection",
      "kind": "LinkedField",
      "name": "__WebHookRecordListPaginationFragmentConnection_webHookRecords_connection",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "WebHookRecordItemDataFragment"
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
        (v1/*: any*/)
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "d4d9d3e2c6cee0cb813531d4debfb2eb";

export default node;
