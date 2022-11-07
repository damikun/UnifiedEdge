/**
 * @generated SignedSource<<b823ff874008c685dbfae6aab8e9658f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GQL_ServerVariant = "MQTT" | "OPC" | "%future added value";
export type CreateServerInput = {
  description?: string | null;
  name: string;
  type: GQL_ServerVariant;
};
export type CreateServerMutation$variables = {
  connections: ReadonlyArray<string>;
  request: CreateServerInput;
};
export type CreateServerMutation$data = {
  readonly createServer: {
    readonly gQL_IServer: {
      readonly " $fragmentSpreads": FragmentRefs<"ServerListItemDataFragment">;
    } | null;
  };
};
export type CreateServerMutation = {
  response: CreateServerMutation$data;
  variables: CreateServerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "request"
},
v2 = [
  {
    "kind": "Variable",
    "name": "request",
    "variableName": "request"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateServerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateServerPayload",
        "kind": "LinkedField",
        "name": "createServer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "gQL_IServer",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ServerListItemDataFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateServerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateServerPayload",
        "kind": "LinkedField",
        "name": "createServer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "gQL_IServer",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isGQL_IServer"
              },
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
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "gQL_IServer",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "GQL_IServer"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "80bd0c9da037fee2a2ed369d06335484",
    "id": null,
    "metadata": {},
    "name": "CreateServerMutation",
    "operationKind": "mutation",
    "text": "mutation CreateServerMutation(\n  $request: CreateServerInput!\n) {\n  createServer(request: $request) {\n    gQL_IServer {\n      __typename\n      ...ServerListItemDataFragment\n      id\n    }\n  }\n}\n\nfragment ServerListItemDataFragment on GQL_IServer {\n  __isGQL_IServer: __typename\n  id\n  name\n  state\n  type\n  __typename\n}\n"
  }
};
})();

(node as any).hash = "e6c13d8f64b63e2cb7f6ffee1f2ee187";

export default node;
