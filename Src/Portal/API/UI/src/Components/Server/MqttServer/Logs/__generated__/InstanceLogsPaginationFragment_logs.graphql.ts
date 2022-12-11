/**
 * @generated SignedSource<<301b0be08691406e4374bcd72c7e217c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstanceLogsPaginationFragment_logs$data = {
  readonly __id: string;
  readonly mqttLogs: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly uid: string;
        readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "InstanceLogsPaginationFragment_logs";
};
export type InstanceLogsPaginationFragment_logs$key = {
  readonly " $data"?: InstanceLogsPaginationFragment_logs$data;
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsPaginationFragment_logs">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "mqttLogs"
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
      "operation": require('./InstanceLogsPaginationFragmentRefetchQuery.graphql')
    }
  },
  "name": "InstanceLogsPaginationFragment_logs",
  "selections": [
    {
      "alias": "mqttLogs",
      "args": [
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "id"
        }
      ],
      "concreteType": "GQL_MqttServerLogConnection",
      "kind": "LinkedField",
      "name": "__InstanceLogsPaginationFragmentConnection_mqttLogs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MqttServerLogEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_MqttServerLog",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "uid",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "InstanceLogsItemDataFragment"
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

(node as any).hash = "d365b3ebb06fe05f681d9c5b205fc977";

export default node;
