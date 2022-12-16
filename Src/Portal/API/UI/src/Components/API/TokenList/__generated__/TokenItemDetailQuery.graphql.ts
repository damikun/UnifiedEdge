/**
 * @generated SignedSource<<31aeaad7568fac7005a1055c6dbcc455>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TokenItemDetailQuery$variables = {
  token_id: string;
};
export type TokenItemDetailQuery$data = {
  readonly tokenById: {
    readonly description: string;
    readonly expiration: any | null;
    readonly id: string;
  };
};
export type TokenItemDetailQuery = {
  response: TokenItemDetailQuery$data;
  variables: TokenItemDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token_id",
        "variableName": "token_id"
      }
    ],
    "concreteType": "GQL_Token",
    "kind": "LinkedField",
    "name": "tokenById",
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
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expiration",
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
    "name": "TokenItemDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenItemDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d7be994166eb9894b8f731858dd882d2",
    "id": null,
    "metadata": {},
    "name": "TokenItemDetailQuery",
    "operationKind": "query",
    "text": "query TokenItemDetailQuery(\n  $token_id: ID!\n) {\n  tokenById(token_id: $token_id) {\n    id\n    description\n    expiration\n  }\n}\n"
  }
};
})();

(node as any).hash = "4ef5d4cb8608b2632448c43a1fd2eb07";

export default node;
