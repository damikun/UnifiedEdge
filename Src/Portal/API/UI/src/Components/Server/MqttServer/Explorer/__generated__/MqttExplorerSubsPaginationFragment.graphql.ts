/**
 * @generated SignedSource<<8f357fc2bbdad6ed9e06835527408027>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerSubsPaginationFragment$data = {
  readonly __id: string;
  readonly mqttExplorerUserStoredSubs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerSubItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "MqttExplorerSubsPaginationFragment";
};
export type MqttExplorerSubsPaginationFragment$key = {
  readonly " $data"?: MqttExplorerSubsPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerSubsPaginationFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "mqttExplorerUserStoredSubs"
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
      "name": "server_uid"
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
      "operation": require('./MqttExplorerSubsPaginationFragmentRefetchQuery.graphql')
    }
  },
  "name": "MqttExplorerSubsPaginationFragment",
  "selections": [
    {
      "alias": "mqttExplorerUserStoredSubs",
      "args": [
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        }
      ],
      "concreteType": "GQL_MqttExplorerSubConnection",
      "kind": "LinkedField",
      "name": "__MqttExplorerSubsPaginationFragmentConnection_mqttExplorerUserStoredSubs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MqttExplorerSubEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_MqttExplorerSub",
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
                  "name": "MqttExplorerSubItemDataFragment"
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

(node as any).hash = "dc169b935da0a095ff603f1559f2d71a";

export default node;
