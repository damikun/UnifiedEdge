/**
 * @generated SignedSource<<28ffed6d9c4adf4040fc9ad002750b27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerQuery$variables = {
  id: string;
};
export type MqttServerQuery$data = {
  readonly mqttServerById: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ServerInfoDataFragment">;
  };
};
export type MqttServerQuery = {
  response: MqttServerQuery$data;
  variables: MqttServerQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerInfoDataFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "GQL_Uptime",
                "kind": "LinkedField",
                "name": "uptime",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "days",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hours",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isValid",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "minutes",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "uptime",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "GQL_IServer",
            "abstractKey": "__isGQL_IServer"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "152830f43318ceee7da1f72bf05ec4db",
    "id": null,
    "metadata": {},
    "name": "MqttServerQuery",
    "operationKind": "query",
    "text": "query MqttServerQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    name\n    ...ServerInfoDataFragment\n    id\n  }\n}\n\nfragment ServerInfoDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  ...ServerInfoNameDataFragment\n  ...ServerInfoStateDataFragment\n  ...ServerInfoUptimeDataFragment\n}\n\nfragment ServerInfoNameDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  name\n}\n\nfragment ServerInfoStateDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  state\n}\n\nfragment ServerInfoUptimeDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  uptime {\n    days\n    hours\n    isValid\n    minutes\n    uptime\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7ccb1a38ed34e6395db18d6a81d8705";

export default node;
