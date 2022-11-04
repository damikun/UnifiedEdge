/**
 * @generated SignedSource<<93a5bc47edb2ed7d042960b09330940d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserProviderQuery$variables = {};
export type UserProviderQuery$data = {
  readonly me: {
    readonly firstName: string | null;
    readonly id: string;
    readonly lastName: string | null;
    readonly name: string | null;
    readonly sessionId: string | null;
  } | null;
};
export type UserProviderQuery = {
  response: UserProviderQuery$data;
  variables: UserProviderQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GQL_User",
    "kind": "LinkedField",
    "name": "me",
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
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sessionId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProviderQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserProviderQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a1777c16c6d8d2beba3bb172581c90e3",
    "id": null,
    "metadata": {},
    "name": "UserProviderQuery",
    "operationKind": "query",
    "text": "query UserProviderQuery {\n  me {\n    id\n    name\n    firstName\n    lastName\n    sessionId\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ef03aab8607f1a58c734ca3f8b352e6";

export default node;
