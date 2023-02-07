/**
 * @generated SignedSource<<1da0ed70db8e3b1b25a4b59bb3a84b28>>
 * @relayHash cf3afd6aa032ea64183160e5e4435097
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cf3afd6aa032ea64183160e5e4435097

import { ConcreteRequest, Query } from 'relay-runtime';
export type ServerInfoConfigModalQuery$variables = {
  id: string;
};
export type ServerInfoConfigModalQuery$data = {
  readonly node: {
    readonly configState?: {
      readonly isConfigMatch: boolean;
      readonly offlineConfig: string | null;
      readonly offlineTimeStamp: string | null;
      readonly onlineConfig: string | null;
      readonly onlineTimeStamp: string | null;
    } | null;
  } | null;
};
export type ServerInfoConfigModalQuery = {
  response: ServerInfoConfigModalQuery$data;
  variables: ServerInfoConfigModalQuery$variables;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_ServerConfigState",
      "kind": "LinkedField",
      "name": "configState",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isConfigMatch",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "offlineTimeStamp",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onlineTimeStamp",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "offlineConfig",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onlineConfig",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerInfoConfigModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ServerInfoConfigModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "cf3afd6aa032ea64183160e5e4435097",
    "metadata": {},
    "name": "ServerInfoConfigModalQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "b4ecc87099a6605ddbd39774774002c7";

export default node;
