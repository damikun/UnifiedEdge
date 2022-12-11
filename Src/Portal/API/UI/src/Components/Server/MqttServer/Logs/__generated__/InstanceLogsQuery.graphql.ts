/**
 * @generated SignedSource<<9744b9a271e6a6d5bf06732c08f8f828>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InstanceLogsQuery$variables = {
  id: string;
};
export type InstanceLogsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"InstanceLogsPaginationFragment_logs">;
};
export type InstanceLogsQuery = {
  response: InstanceLogsQuery$data;
  variables: InstanceLogsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "id"
  }
],
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InstanceLogsQuery",
    "selections": [
      {
        "args": [
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
    "name": "InstanceLogsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "server_uid"
        ],
        "handle": "connection",
        "key": "InstanceLogsPaginationFragmentConnection_mqttLogs",
        "kind": "LinkedHandle",
        "name": "mqttLogs"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "b747b7fefff3c8853dab14138c338a53",
    "id": null,
    "metadata": {},
    "name": "InstanceLogsQuery",
    "operationKind": "query",
    "text": "query InstanceLogsQuery(\n  $id: ID!\n) {\n  ...InstanceLogsPaginationFragment_logs_1Bmzm5\n}\n\nfragment InstanceLogsItemDataFragment on GQL_MqttServerLog {\n  uid\n  source\n  message\n  logLevel\n  timeStamp\n}\n\nfragment InstanceLogsPaginationFragment_logs_1Bmzm5 on Query {\n  mqttLogs(server_uid: $id, first: 20) {\n    edges {\n      node {\n        uid\n        ...InstanceLogsItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e67af6cf34aef4f05a7b223f93a4a4c";

export default node;
