/**
 * @generated SignedSource<<40373203e0b066ce1d878be6be867673>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type ServerInfoConfigMatchSubscription$variables = {
  id: string;
};
export type ServerInfoConfigMatchSubscription$data = {
  readonly mqttServerConfigState: {
    readonly isMatch: boolean;
  };
};
export type ServerInfoConfigMatchSubscription = {
  response: ServerInfoConfigMatchSubscription$data;
  variables: ServerInfoConfigMatchSubscription$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "server_id",
        "variableName": "id"
      }
    ],
    "concreteType": "GQL_ConfigMatch",
    "kind": "LinkedField",
    "name": "mqttServerConfigState",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isMatch",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerInfoConfigMatchSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerInfoConfigMatchSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "06c5b473a61ac6cafed917965d4ecebc",
    "id": null,
    "metadata": {},
    "name": "ServerInfoConfigMatchSubscription",
    "operationKind": "subscription",
    "text": "subscription ServerInfoConfigMatchSubscription(\n  $id: ID!\n) {\n  mqttServerConfigState(server_id: $id) {\n    isMatch\n  }\n}\n"
  }
};
})();

(node as any).hash = "2576d1d3cd6b5d958d8d4a2d4c7674dc";

export default node;
