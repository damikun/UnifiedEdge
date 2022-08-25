/**
 * @generated SignedSource<<cc1400e12cf4a2da3ba78d7983badf66>>
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
    readonly id: string;
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
    "cacheID": "9c6f1f3926fad9be130e3bf12552447e",
    "id": null,
    "metadata": {},
    "name": "UserProviderQuery",
    "operationKind": "query",
    "text": "query UserProviderQuery {\n  me {\n    id\n    name\n    sessionId\n  }\n}\n"
  }
};
})();

(node as any).hash = "c286cf347237f71a26a8641ef3f29069";

export default node;
