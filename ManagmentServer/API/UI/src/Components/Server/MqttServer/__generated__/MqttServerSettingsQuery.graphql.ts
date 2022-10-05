/**
 * @generated SignedSource<<ef8de8f1da035a327a5bd02598d30ee7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerSettingsQuery$variables = {
  id: string;
};
export type MqttServerSettingsQuery$data = {
  readonly mqttServerById: {
    readonly " $fragmentSpreads": FragmentRefs<"ServerSharedSettingsFragment">;
  };
};
export type MqttServerSettingsQuery = {
  response: MqttServerSettingsQuery$data;
  variables: MqttServerSettingsQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ServerSharedSettingsFragment"
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
    "name": "MqttServerSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_MqttServer",
        "kind": "LinkedField",
        "name": "mqttServerById",
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
            "kind": "InlineFragment",
            "selections": [
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
                "name": "location",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
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
    "cacheID": "416f313a0157188cfe569813f36efd1f",
    "id": null,
    "metadata": {},
    "name": "MqttServerSettingsQuery",
    "operationKind": "query",
    "text": "query MqttServerSettingsQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    ...ServerSharedSettingsFragment\n    id\n  }\n}\n\nfragment ServerDescriptionDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  description\n}\n\nfragment ServerLocationDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  location\n}\n\nfragment ServerNameDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  name\n}\n\nfragment ServerSharedSettingsFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  ...ServerNameDataFragment\n  ...ServerLocationDataFragment\n  ...ServerDescriptionDataFragment\n}\n"
  }
};
})();

(node as any).hash = "3d154d82230b9348501f5230e5079e8b";

export default node;
