/**
 * @generated SignedSource<<f7c0e8e51161144209ed0df192042f59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type GQL_ServerState = "DISABLED" | "RESTARTING" | "STARTED" | "STARTING" | "STOPPED" | "STOPPING" | "UNDEFINED" | "%future added value";
export type ServerInfoStateSubscription$variables = {
  id: string;
};
export type ServerInfoStateSubscription$data = {
  readonly serverStateChanged: {
    readonly server_Uid: string | null;
    readonly state: GQL_ServerState;
  };
};
export type ServerInfoStateSubscription = {
  response: ServerInfoStateSubscription$data;
  variables: ServerInfoStateSubscription$variables;
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
    "concreteType": "GQL_ServerStateChangedNotification",
    "kind": "LinkedField",
    "name": "serverStateChanged",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "server_Uid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "state",
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
    "name": "ServerInfoStateSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerInfoStateSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "59addfb4af460e3dedd616e329adf673",
    "id": null,
    "metadata": {},
    "name": "ServerInfoStateSubscription",
    "operationKind": "subscription",
    "text": "subscription ServerInfoStateSubscription(\n  $id: ID!\n) {\n  serverStateChanged(server_id: $id) {\n    server_Uid\n    state\n  }\n}\n"
  }
};
})();

(node as any).hash = "14f7565b27a46d01c073ca2ac61fb894";

export default node;
