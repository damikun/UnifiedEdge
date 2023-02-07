/**
 * @generated SignedSource<<176fff410c7d7831fb9fa0bea9df264a>>
 * @relayHash 35a5f4fdb696db91f696bdf2c6913b65
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 35a5f4fdb696db91f696bdf2c6913b65

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserProviderQuery$variables = {};
export type UserProviderQuery$data = {
  readonly me: {
    readonly firstName: string | null;
    readonly id: string;
    readonly lastName: string | null;
    readonly sessionId: string | null;
    readonly userName: string | null;
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
        "name": "userName",
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
    "id": "35a5f4fdb696db91f696bdf2c6913b65",
    "metadata": {},
    "name": "UserProviderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ab233adc61f66644052ce57c2290ea7a";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
