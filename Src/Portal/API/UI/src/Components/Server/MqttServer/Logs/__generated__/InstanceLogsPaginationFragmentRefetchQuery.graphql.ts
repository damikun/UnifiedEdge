/**
 * @generated SignedSource<<68585e9fda22109dfd2fd0b55504eeb6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstanceLogsPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type InstanceLogsPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsPaginationFragment_logs">;
};
export type InstanceLogsPaginationFragmentRefetchQuery = {
  response: InstanceLogsPaginationFragmentRefetchQuery$data;
  variables: InstanceLogsPaginationFragmentRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "id"
  }
],
v4 = {
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
    "name": "InstanceLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "FragmentSpread",
        "name": "InstanceLogsPaginationFragment_logs"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InstanceLogsPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "GQL_MqttServerLogConnection",
        "kind": "LinkedField",
        "name": "mqttLogs",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "source",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "message",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "logLevel",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "timeStamp",
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
          (v4/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "server_uid"
        ],
        "handle": "connection",
        "key": "InstanceLogsPaginationFragmentConnection_mqttLogs",
        "kind": "LinkedHandle",
        "name": "mqttLogs"
      },
      (v4/*: any*/)
    ]
  },
  "params": {
    "cacheID": "b657e9060fa4927828a3085c945b3608",
    "id": null,
    "metadata": {},
    "name": "InstanceLogsPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query InstanceLogsPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $id: ID!\n) {\n  ...InstanceLogsPaginationFragment_logs_XKRaI\n}\n\nfragment InstanceLogsItemDataFragment on GQL_MqttServerLog {\n  uid\n  source\n  message\n  logLevel\n  timeStamp\n}\n\nfragment InstanceLogsPaginationFragment_logs_XKRaI on Query {\n  mqttLogs(server_uid: $id, first: $first, after: $after) {\n    edges {\n      node {\n        uid\n        ...InstanceLogsItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d365b3ebb06fe05f681d9c5b205fc977";

export default node;
