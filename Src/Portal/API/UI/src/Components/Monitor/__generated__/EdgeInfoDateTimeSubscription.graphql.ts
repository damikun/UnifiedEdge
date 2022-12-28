/**
 * @generated SignedSource<<94d416c6715ac0624939dd9374be5bfa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type EdgeInfoDateTimeSubscription$variables = {};
export type EdgeInfoDateTimeSubscription$data = {
  readonly systemTime: string;
};
export type EdgeInfoDateTimeSubscription = {
  response: EdgeInfoDateTimeSubscription$data;
  variables: EdgeInfoDateTimeSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "systemTime",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EdgeInfoDateTimeSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeInfoDateTimeSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7a3575667d40cbe23f061e49b8b63c8a",
    "id": null,
    "metadata": {},
    "name": "EdgeInfoDateTimeSubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeInfoDateTimeSubscription {\n  systemTime\n}\n"
  }
};
})();

(node as any).hash = "23e97d3f7e8f25bc6d062c3a0d22151c";

export default node;
