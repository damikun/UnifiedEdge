/**
 * @generated SignedSource<<5d5ad4a1ea66ac21e4de257b52386267>>
 * @relayHash 06c5b473a61ac6cafed917965d4ecebc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 06c5b473a61ac6cafed917965d4ecebc

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
    "id": "06c5b473a61ac6cafed917965d4ecebc",
    "metadata": {},
    "name": "ServerInfoConfigMatchSubscription",
    "operationKind": "subscription",
    "text": null
  }
};
})();

(node as any).hash = "2576d1d3cd6b5d958d8d4a2d4c7674dc";

export default node;
