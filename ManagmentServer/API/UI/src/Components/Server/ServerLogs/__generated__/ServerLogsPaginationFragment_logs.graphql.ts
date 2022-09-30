/**
 * @generated SignedSource<<68ebae49fafcf7da6d74f593832e8e0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerLogsPaginationFragment_logs$data = {
  readonly __id: string;
  readonly serverLogs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly iD?: string;
        readonly " $fragmentSpreads": FragmentRefs<"ServerLogsItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "ServerLogsPaginationFragment_logs";
};
export type ServerLogsPaginationFragment_logs$key = {
  readonly " $data"?: ServerLogsPaginationFragment_logs$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerLogsPaginationFragment_logs">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "serverLogs"
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
      "name": "id"
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
      "operation": require('./ServerLogsPaginationFragmentRefetchQuery.graphql')
    }
  },
  "name": "ServerLogsPaginationFragment_logs",
  "selections": [
    {
      "alias": "serverLogs",
      "args": [
        {
          "kind": "Variable",
          "name": "server_id",
          "variableName": "id"
        }
      ],
      "concreteType": "GQL_IServerEventUnionConnection",
      "kind": "LinkedField",
      "name": "__ServerLogsPaginationFragmentConnection_serverLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_IServerEventUnionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
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
                      "name": "ServerLogsItemDataFragment"
                    }
                  ],
                  "type": "GQL_IServerEvent",
                  "abstractKey": "__isGQL_IServerEvent"
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

(node as any).hash = "e9907c444e2f2b1fd34c94177d5b779a";

export default node;
