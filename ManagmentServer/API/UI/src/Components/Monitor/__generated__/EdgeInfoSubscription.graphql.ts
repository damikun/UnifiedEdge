/**
 * @generated SignedSource<<ae5788392ab0b850331b89a4fd05c4b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type EdgeInfoSubscription$variables = {};
export type EdgeInfoSubscription$data = {
  readonly uptime: {
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
  };
};
export type EdgeInfoSubscription = {
  response: EdgeInfoSubscription$data;
  variables: EdgeInfoSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GQL_Uptime",
    "kind": "LinkedField",
    "name": "uptime",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hours",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minutes",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "days",
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
    "name": "EdgeInfoSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeInfoSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "66d3d73662cd8a238c1c05f5951656a7",
    "id": null,
    "metadata": {},
    "name": "EdgeInfoSubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeInfoSubscription {\n  uptime {\n    hours\n    minutes\n    days\n  }\n}\n"
  }
};
})();

(node as any).hash = "12e9e05c03870cd6c19e4fcad0b3e938";

export default node;
