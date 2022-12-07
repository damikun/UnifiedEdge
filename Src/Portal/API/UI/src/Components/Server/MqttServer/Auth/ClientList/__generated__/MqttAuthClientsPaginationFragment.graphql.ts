/**
 * @generated SignedSource<<ba0153e3a2ddad1c8b791d049aba8851>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthClientsPaginationFragment$data = {
  readonly __id: string;
  readonly mqttAuthClients: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly clientId: string | null;
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientItemDataFragment">;
      } | null;
    }> | null;
  } | null;
  readonly " $fragmentType": "MqttAuthClientsPaginationFragment";
};
export type MqttAuthClientsPaginationFragment$key = {
  readonly " $data"?: MqttAuthClientsPaginationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientsPaginationFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "mqttAuthClients"
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
      "operation": require('./MqttAuthClientsPaginationFragmentRefetchQuery.graphql')
    }
  },
  "name": "MqttAuthClientsPaginationFragment",
  "selections": [
    {
      "alias": "mqttAuthClients",
      "args": [
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        }
      ],
      "concreteType": "GQL_MqttAuthClientConnection",
      "kind": "LinkedField",
      "name": "__MqttAuthClientsPaginationFragmentConnection_mqttAuthClients_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MqttAuthClientEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_MqttAuthClient",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "clientId",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MqttAuthClientItemDataFragment"
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

(node as any).hash = "d19e93181d29695aee2cce35110c9566";

export default node;
