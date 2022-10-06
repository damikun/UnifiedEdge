/**
 * @generated SignedSource<<95c18bdf07b18ef0fb1c1377afbd6c4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerInfoQuery$variables = {
  id: string;
};
export type MqttServerInfoQuery$data = {
  readonly mqttServerById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ServerSharedInfoFragment">;
  };
};
export type MqttServerInfoQuery = {
  response: MqttServerInfoQuery$data;
  variables: MqttServerInfoQuery$variables;
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MqttServerInfoQuery",
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
            "name": "ServerSharedInfoFragment"
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
    "name": "MqttServerInfoQuery",
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
            "kind": "TypeDiscriminator",
            "abstractKey": "__isGQL_IServer"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9d5e24edf3b3c4c794c9736a09557c75",
    "id": null,
    "metadata": {},
    "name": "MqttServerInfoQuery",
    "operationKind": "query",
    "text": "query MqttServerInfoQuery(\n  $id: ID!\n) {\n  mqttServerById(id: $id) {\n    id\n    ...ServerSharedInfoFragment\n  }\n}\n\nfragment ServerSharedInfoFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n}\n"
  }
};
})();

(node as any).hash = "2d91b7173f3a8350169229725ec8c39f";

export default node;
