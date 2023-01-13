/**
 * @generated SignedSource<<7eab70fe3afba9356ee9163569a14727>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerPublishMessageQuery$variables = {
  server_uid: string;
};
export type MqttExplorerPublishMessageQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerPublishMessageStoredTemplatesPaginationFragment">;
};
export type MqttExplorerPublishMessageQuery = {
  response: MqttExplorerPublishMessageQuery$data;
  variables: MqttExplorerPublishMessageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "server_uid"
  }
],
v1 = {
  "kind": "Variable",
  "name": "server_uid",
  "variableName": "server_uid"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v1/*: any*/)
],
v3 = {
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
    "name": "MqttExplorerPublishMessageQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
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
    "name": "MqttExplorerPublishMessageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "filters": [
          "server_uid"
        ],
        "handle": "connection",
        "key": "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentConnection_mqttExplorerStoredTemplates",
        "kind": "LinkedHandle",
        "name": "mqttExplorerStoredTemplates"
      },
      (v3/*: any*/)
    ]
  },
  "params": {
    "cacheID": "e8e3c020d99a203e7ead74a1c08ed119",
    "id": null,
    "metadata": {},
    "name": "MqttExplorerPublishMessageQuery",
    "operationKind": "query",
    "text": "query MqttExplorerPublishMessageQuery(\n  $server_uid: ID!\n) {\n  ...MqttExplorerPublishMessageStoredTemplatesPaginationFragment_9QbYl\n}\n\nfragment MqttExplorerPublishMessageStoredTemplateItemDataFragment on GQL_MqttMessageTemplate {\n  id\n  name\n  payload\n  qoS\n  retain\n  topic\n}\n\nfragment MqttExplorerPublishMessageStoredTemplatesPaginationFragment_9QbYl on Query {\n  mqttExplorerStoredTemplates(server_uid: $server_uid, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttExplorerPublishMessageStoredTemplateItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "de7d13267994ae3c19e3bcc5cca849f1";

export default node;
