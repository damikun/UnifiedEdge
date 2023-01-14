/**
 * @generated SignedSource<<004eb5bb0d768c08fde64547c04afb9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SystemLogsPaginationFragment$data = {
  readonly __id: string;
  readonly systemLogs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly iD: string;
        readonly " $fragmentSpreads": FragmentRefs<"SystemLogItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "SystemLogsPaginationFragment";
};
export type SystemLogsPaginationFragment$key = {
  readonly " $data"?: SystemLogsPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SystemLogsPaginationFragment">;
};

import SystemLogsPaginationFragmentRefetchQuery_graphql from './SystemLogsPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "systemLogs"
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
      "operation": SystemLogsPaginationFragmentRefetchQuery_graphql
    }
  },
  "name": "SystemLogsPaginationFragment",
  "selections": [
    {
      "alias": "systemLogs",
      "args": null,
      "concreteType": "GQL_SystemEventConnection",
      "kind": "LinkedField",
      "name": "__SystemLogsPaginationFragmentConnection_systemLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_SystemEventEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_SystemEvent",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "iD",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SystemLogItemDataFragment"
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

(node as any).hash = "fdbe329b9102f99f34fae28bf3a3ae16";

export default node;
