/**
 * @generated SignedSource<<74eba2325b878816258b57879d7a4b91>>
 * @relayHash a6115a647fe5b2231ad346e338bbace1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a6115a647fe5b2231ad346e338bbace1

import { ConcreteRequest, Query } from 'relay-runtime';
export type ServerlogDetailQuery$variables = {
  log_id: string;
};
export type ServerlogDetailQuery$data = {
  readonly serverLogById: {
    readonly asJson?: string | null;
    readonly iD?: string;
    readonly name?: string;
    readonly timeStamp?: string;
  };
};
export type ServerlogDetailQuery = {
  response: ServerlogDetailQuery$data;
  variables: ServerlogDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "log_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "log_id",
    "variableName": "log_id"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "iD",
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
      "name": "asJson",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeStamp",
      "storageKey": null
    }
  ],
  "type": "GQL_IServerEvent",
  "abstractKey": "__isGQL_IServerEvent"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ServerlogDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "serverLogById",
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
    "name": "ServerlogDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "serverLogById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "a6115a647fe5b2231ad346e338bbace1",
    "metadata": {},
    "name": "ServerlogDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "33eb1c3f5be769536d0af86d642a71e4";

export default node;
