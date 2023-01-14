/**
 * @generated SignedSource<<c3c6ade28e02566bad53c10370d655aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthLogsPaginationFragment$data = {
  readonly __id: string;
  readonly mqttAuthLogs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MqttAuthLogItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "MqttAuthLogsPaginationFragment";
};
export type MqttAuthLogsPaginationFragment$key = {
  readonly " $data"?: MqttAuthLogsPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthLogsPaginationFragment">;
};

import MqttAuthLogsPaginationFragmentRefetchQuery_graphql from './MqttAuthLogsPaginationFragmentRefetchQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "mqttAuthLogs"
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
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "auth_client_id"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "auth_user_id"
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
      "operation": MqttAuthLogsPaginationFragmentRefetchQuery_graphql
    }
  },
  "name": "MqttAuthLogsPaginationFragment",
  "selections": [
    {
      "alias": "mqttAuthLogs",
      "args": [
        {
          "kind": "Variable",
          "name": "auth_client_id",
          "variableName": "auth_client_id"
        },
        {
          "kind": "Variable",
          "name": "auth_user_id",
          "variableName": "auth_user_id"
        },
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        }
      ],
      "concreteType": "GQL_MqttAuthLogConnection",
      "kind": "LinkedField",
      "name": "__MqttAuthLogsPaginationFragmentConnection_mqttAuthLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MqttAuthLogEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_MqttAuthLog",
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
                  "name": "MqttAuthLogItemDataFragment"
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

(node as any).hash = "661cb1835a87dbe1184e654deb0c6115";

export default node;
