/**
 * @generated SignedSource<<100093c213b463db1f2ae3f2ebf4dbd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdapterLogsPaginationFragment_logs$data = {
  readonly __id: string;
  readonly id: string;
  readonly logs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"AdapterLogsItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "AdapterLogsPaginationFragment_logs";
};
export type AdapterLogsPaginationFragment_logs$key = {
  readonly " $data"?: AdapterLogsPaginationFragment_logs$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdapterLogsPaginationFragment_logs">;
};

import AdapterLogsPaginationFragmentRefetchQuery_graphql from './AdapterLogsPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "logs"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": AdapterLogsPaginationFragmentRefetchQuery_graphql,
      "identifierField": "id"
    }
  },
  "name": "AdapterLogsPaginationFragment_logs",
  "selections": [
    {
      "alias": "logs",
      "args": null,
      "concreteType": "GQL_AdapterLogConnection",
      "kind": "LinkedField",
      "name": "__AdapterLogsPaginationFragmentConnection_logs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_AdapterLogEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_AdapterLog",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "AdapterLogsItemDataFragment"
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
        (v2/*: any*/)
      ],
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/)
  ],
  "type": "GQL_Adapter",
  "abstractKey": null
};
})();

(node as any).hash = "dc7cf74cd02132c7d5bef49287ca7b40";

export default node;
