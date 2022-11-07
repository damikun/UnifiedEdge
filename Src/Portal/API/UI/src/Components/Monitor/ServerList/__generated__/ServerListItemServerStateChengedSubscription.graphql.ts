/**
 * @generated SignedSource<<346bbdd0c74fa4c2cf6024edb4bb23f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type GQL_ServerState = "DISABLED" | "RESTARTING" | "STARTED" | "STARTING" | "STOPPED" | "STOPPING" | "UNDEFINED" | "%future added value";
export type ServerListItemServerStateChengedSubscription$variables = {
  id: string;
};
export type ServerListItemServerStateChengedSubscription$data = {
  readonly serverStateChanged: {
    readonly server_Uid: string | null;
    readonly state: GQL_ServerState;
  };
};
export type ServerListItemServerStateChengedSubscription = {
  response: ServerListItemServerStateChengedSubscription$data;
  variables: ServerListItemServerStateChengedSubscription$variables;
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
    "name": "ServerListItemServerStateChengedSubscription",
    "selections": (v1/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerListItemServerStateChengedSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "99e5a52ef75cddcdc0786b8b71bf2b46",
    "id": null,
    "metadata": {},
    "name": "ServerListItemServerStateChengedSubscription",
    "operationKind": "subscription",
    "text": "subscription ServerListItemServerStateChengedSubscription(\n  $id: ID!\n) {\n  serverStateChanged(server_id: $id) {\n    server_Uid\n    state\n  }\n}\n"
  }
};
})();

(node as any).hash = "6761a800de37269ff4b0a60b4d9774d3";

export default node;
