/**
 * @generated SignedSource<<aa16d49c5f1cd33e19e5dc2cae287f0d>>
 * @relayHash 8e5614ac4d8bd42f3a34ef5eebc27cec
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8e5614ac4d8bd42f3a34ef5eebc27cec

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerAuthQuery$variables = {
  id: string;
};
export type MqttServerAuthQuery$data = {
  readonly mqttServerById: {
    readonly id: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientsBarEnableFragment" | "MqttAuthClientsPaginationFragment" | "MqttAuthLogsPaginationFragment" | "MqttAuthUsersBarEnableFragment" | "MqttAuthUsersPaginationFragment">;
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
  "name": "lastAuthenticate",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
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
v11 = {
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
v12 = [
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
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthClientsBarEnableFragment"
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthUsersBarEnableFragment"
      },
      {
        "args": (v4/*: any*/),
        "kind": "FragmentSpread",
        "name": "MqttAuthLogsPaginationFragment"
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
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": (v12/*: any*/),
        "handle": "connection",
        "key": "MqttAuthClientsPaginationFragmentConnection_mqttAuthClients",
        "kind": "LinkedHandle",
        "name": "mqttAuthClients"
      },
      (v11/*: any*/),
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
                  (v7/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": (v12/*: any*/),
        "handle": "connection",
        "key": "MqttAuthUsersPaginationFragmentConnection_mqttAuthUsers",
        "kind": "LinkedHandle",
        "name": "mqttAuthUsers"
      },
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "GQL_MqttAuthCfg",
        "kind": "LinkedField",
        "name": "mqttServerAuthCfg",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clientAuthEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userAuthEnabled",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "GQL_MqttAuthLogConnection",
        "kind": "LinkedField",
        "name": "mqttAuthLogs",
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "errorMessage",
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
                    "name": "jsonMetadata",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v5/*: any*/),
        "filters": [
          "server_uid",
          "auth_user_id",
          "auth_client_id"
        ],
        "handle": "connection",
        "key": "MqttAuthLogsPaginationFragmentConnection_mqttAuthLogs",
        "kind": "LinkedHandle",
        "name": "mqttAuthLogs"
      }
    ]
  },
  "params": {
    "id": "8e5614ac4d8bd42f3a34ef5eebc27cec",
    "metadata": {},
    "name": "MqttServerAuthQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0e794f5056b2415460ee337f197f4c7a";

export default node;
