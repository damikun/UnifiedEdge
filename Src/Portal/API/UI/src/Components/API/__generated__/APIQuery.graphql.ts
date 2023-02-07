/**
 * @generated SignedSource<<091ef11206d805b9b99f8235d83a7331>>
 * @relayHash ccec18cf5e04ae530151cbff9f0eedb5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ccec18cf5e04ae530151cbff9f0eedb5

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type APIQuery$variables = {};
export type APIQuery$data = {
  readonly edgeInfo: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ApiInfoFragment">;
  };
};
export type APIQuery = {
  response: APIQuery$data;
  variables: APIQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "APIQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "edgeInfo",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ApiInfoFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "APIQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "edgeInfo",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
            "name": "apiGraphql",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "apiRest",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ccec18cf5e04ae530151cbff9f0eedb5",
    "metadata": {},
    "name": "APIQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "e17f3562b244e96b8b9b8666bf51c575";

export default node;
