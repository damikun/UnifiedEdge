/**
 * @generated SignedSource<<7d475b4f59431c7a1d9c84b431b85412>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserQuery$variables = {
  user_id: string;
};
export type UserQuery$data = {
  readonly userById: {
    readonly " $fragmentSpreads": FragmentRefs<"UserInfoBarDataFragment">;
  };
};
export type UserQuery = {
  response: UserQuery$data;
  variables: UserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user_id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "user_id",
    "variableName": "user_id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "userById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserInfoBarDataFragment"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "userById",
        "plural": false,
        "selections": [
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
            "name": "enabled",
            "storageKey": null
          },
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
    "cacheID": "884f87dd3ce314b15efa4848612c24bc",
    "id": null,
    "metadata": {},
    "name": "UserQuery",
    "operationKind": "query",
    "text": "query UserQuery(\n  $user_id: ID!\n) {\n  userById(user_id: $user_id) {\n    ...UserInfoBarDataFragment\n    id\n  }\n}\n\nfragment UserActivDataFragment on GQL_User {\n  enabled\n}\n\nfragment UserInfoBarDataFragment on GQL_User {\n  ...UserNameDataFragment\n  ...UserActivDataFragment\n}\n\nfragment UserNameDataFragment on GQL_User {\n  userName\n}\n"
  }
};
})();

(node as any).hash = "cb9dd991087310927c8bcc42fb9fbc70";

export default node;
