/**
 * @generated SignedSource<<f13311f0fac8150ca297571fb1524895>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type EdgeInfoUptimeSubscription$variables = {};
export type EdgeInfoUptimeSubscription$data = {
  readonly uptime: {
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
  };
};
export type EdgeInfoUptimeSubscription = {
  response: EdgeInfoUptimeSubscription$data;
  variables: EdgeInfoUptimeSubscription$variables;
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
    "name": "EdgeInfoUptimeSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeInfoUptimeSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2a48d0dece24593a6335225a5a29d21b",
    "id": null,
    "metadata": {},
    "name": "EdgeInfoUptimeSubscription",
    "operationKind": "subscription",
    "text": "subscription EdgeInfoUptimeSubscription {\n  uptime {\n    hours\n    minutes\n    days\n  }\n}\n"
  }
};
})();

(node as any).hash = "f9f19fb32043d17072be30052f437559";

export default node;
