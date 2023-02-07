/**
 * @generated SignedSource<<b3b685565fcbc1cd2cc393d7cbc6fb0a>>
 * @relayHash 168afaeebceeb415e21b0e4e675cb274
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 168afaeebceeb415e21b0e4e675cb274

import { ConcreteRequest, Query } from 'relay-runtime';
export type TokenItemDetailQuery$variables = {
  token_id: string;
};
export type TokenItemDetailQuery$data = {
  readonly tokenById: {
    readonly description: string;
    readonly expiration: string | null;
    readonly id: string;
    readonly jsonData: string | null;
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "jsonData",
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
    "id": "168afaeebceeb415e21b0e4e675cb274",
    "metadata": {},
    "name": "TokenItemDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "94f178ea35e57bf254e1b5aea67f45b4";

export default node;
