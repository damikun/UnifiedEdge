/**
 * @generated SignedSource<<80d25c75eb4ae1109bdf838705b7dfe8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerAuthQuery$variables = {
  id: string;
};
export type MqttServerAuthQuery$data = {
  readonly mqttServerById: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientsPaginationFragment" | "MqttAuthUsersPaginationFragment">;
};
export type MqttServerAuthQuery = {
  response: MqttServerAuthQuery$data;
  variables: MqttServerAuthQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "id"
    }
  ],
  "concreteType": "GQL_MqttServer",
  "kind": "LinkedField",
  "name": "mqttServerById",
  "plural": false,
  "selections": [
    (v1/*: any*/)
  ],
  "storageKey": null
},
v3 = {
  "kind": "Variable",
  "name": "server_uid",
  "variableName": "id"
},
v4 = [
  (v3/*: any*/)
],
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "enabled",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
v10 = {
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
},
v11 = [
  "server_uid"
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerAuthQuery",
    "selections": [
      (v2/*: any*/),
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthClientsPaginationFragment"
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthUsersPaginationFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerAuthQuery",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "GQL_MqttAuthClientConnection",
        "kind": "LinkedField",
        "name": "mqttAuthClients",
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clientId",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": (v11/*: any*/),
        "handle": "connection",
        "key": "MqttAuthClientsPaginationFragmentConnection_mqttAuthClients",
        "kind": "LinkedHandle",
        "name": "mqttAuthClients"
      },
      (v10/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "GQL_MqttAuthUserConnection",
        "kind": "LinkedField",
        "name": "mqttAuthUsers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_MqttAuthUserEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_MqttAuthUser",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "userName",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": (v11/*: any*/),
        "handle": "connection",
        "key": "MqttAuthUsersPaginationFragmentConnection_mqttAuthUsers",
        "kind": "LinkedHandle",
        "name": "mqttAuthUsers"
      }
    ]
  },
  "params": {
    "cacheID": "e79267a39146b5ca4152d7d6d1728dc2",
    "id": null,
    "metadata": {},
    "name": "MqttServerAuthQuery",
    "operationKind": "query",
    "text": "query MqttServerAuthQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    id\n  }\n  ...MqttAuthClientsPaginationFragment_2YLYDF\n  ...MqttAuthUsersPaginationFragment_2YLYDF\n}\n\nfragment MqttAuthClientItemDataFragment on GQL_MqttAuthClient {\n  clientId\n  enabled\n  id\n}\n\nfragment MqttAuthClientsPaginationFragment_2YLYDF on Query {\n  mqttAuthClients(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttAuthClientItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment MqttAuthUserItemDataFragment on GQL_MqttAuthUser {\n  userName\n  enabled\n  id\n}\n\nfragment MqttAuthUsersPaginationFragment_2YLYDF on Query {\n  mqttAuthUsers(server_uid: $id, first: 20) {\n    edges {\n      node {\n        id\n        ...MqttAuthUserItemDataFragment\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e1724905db81f2c66137312df116887e";

export default node;
