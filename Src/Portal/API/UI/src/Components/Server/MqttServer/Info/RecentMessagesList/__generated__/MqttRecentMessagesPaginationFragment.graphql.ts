/**
 * @generated SignedSource<<54d14e1e3f28ce917d0b56e68fa67a0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesPaginationFragment$data = {
  readonly __id: string;
  readonly mqttServerRecentMessages: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "MqttRecentMessagesPaginationFragment";
};
export type MqttRecentMessagesPaginationFragment$key = {
  readonly " $data"?: MqttRecentMessagesPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesPaginationFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "mqttServerRecentMessages"
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
      "name": "client_uid"
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
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topic_uid"
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
      "operation": require('./MqttRecentMessagesPaginationFragmentRefetchQuery.graphql')
    }
  },
  "name": "MqttRecentMessagesPaginationFragment",
  "selections": [
    {
      "alias": "mqttServerRecentMessages",
      "args": [
        {
          "kind": "Variable",
          "name": "client_uid",
          "variableName": "client_uid"
        },
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        },
        {
          "kind": "Variable",
          "name": "topic_uid",
          "variableName": "topic_uid"
        }
      ],
      "concreteType": "GQL_MqttMessageConnection",
      "kind": "LinkedField",
      "name": "__MqttRecentMessagesPaginationFragmentConnection_mqttServerRecentMessages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MqttMessageEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_MqttMessage",
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
                  "name": "MqttRecentMessagesItemDataFragment"
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

(node as any).hash = "39b5a4be39db39e6215c22114d6347ce";

export default node;
