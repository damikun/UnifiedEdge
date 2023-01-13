/**
 * @generated SignedSource<<60834033c66f0c2e0390baa9744b51df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery$variables = {
  after?: string | null;
  first?: number | null;
  server_uid: string;
};
export type MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerPublishMessageStoredTemplatesPaginationFragment">;
};
export type MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery = {
  response: MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery$data;
  variables: MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery$variables;
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
    "name": "server_uid"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "server_uid"
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
    "name": "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttExplorerPublishMessageStoredTemplatesPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttMessageTemplateConnection",
        "kind": "LinkedField",
        "name": "mqttExplorerStoredTemplates",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttMessageTemplateEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttMessageTemplate",
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
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "payload",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qoS",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "retain",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "topic",
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
        "key": "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentConnection_mqttExplorerStoredTemplates",
        "kind": "LinkedHandle",
        "name": "mqttExplorerStoredTemplates"
      },
      (v2/*: any*/)
    ]
  },
  "params": {
    "cacheID": "c9125bdf02de1525894a41f695e63027",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery",
    "operationKind": "query",
    "text": "query MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery(\n  $after: String\n  $first: Int = 20\n  $server_uid: ID!\n) {\n  ...MqttExplorerPublishMessageStoredTemplatesPaginationFragment_3VI1TY\n}\n\nfragment MqttExplorerPublishMessageStoredTemplateItemDataFragment on GQL_MqttMessageTemplate {\n  id\n  name\n  payload\n  qoS\n  retain\n  topic\n}\n\nfragment MqttExplorerPublishMessageStoredTemplatesPaginationFragment_3VI1TY on Query {\n  mqttExplorerStoredTemplates(server_uid: $server_uid, first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...MqttExplorerPublishMessageStoredTemplateItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "47d787aa7a8201839af1ce5dbe547997";

export default node;
