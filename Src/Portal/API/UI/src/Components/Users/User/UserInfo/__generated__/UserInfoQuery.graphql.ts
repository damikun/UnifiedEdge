/**
 * @generated SignedSource<<f05c39a018208428ede44f102cda8ba8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserInfoQuery$variables = {
  id: string;
};
export type UserInfoQuery$data = {
  readonly userById: {
    readonly " $fragmentSpreads": FragmentRefs<"UserGeneralInfoFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UserClaimsInfoFragment" | "UserRolesInfoFragment" | "UserScopesInfoFragment">;
};
export type UserInfoQuery = {
  response: UserInfoQuery$data;
  variables: UserInfoQuery$variables;
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
    "name": "user_id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserInfoQuery",
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
            "name": "UserGeneralInfoFragment"
          }
        ],
        "storageKey": null
      },
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "UserClaimsInfoFragment"
      },
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "UserScopesInfoFragment"
      },
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "UserRolesInfoFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserInfoQuery",
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
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sub",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "userName",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_Claim",
        "kind": "LinkedField",
        "name": "userClaims",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "value",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "kind": "ScalarField",
        "name": "userRoles",
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c1aa76a2f0710522d5be2df3b9ab16ab",
    "id": null,
    "metadata": {},
    "name": "UserInfoQuery",
    "operationKind": "query",
    "text": "query UserInfoQuery(\n  $id: ID!\n) {\n  userById(user_id: $id) {\n    ...UserGeneralInfoFragment\n    id\n  }\n  ...UserClaimsInfoFragment_3UvyJX\n  ...UserScopesInfoFragment_3UvyJX\n  ...UserRolesInfoFragment_3UvyJX\n}\n\nfragment UserClaimsInfoFragment_3UvyJX on Query {\n  userClaims(user_id: $id) {\n    type\n    value\n  }\n}\n\nfragment UserGeneralInfoFragment on GQL_User {\n  id\n  sub\n  firstName\n  lastName\n  userName\n}\n\nfragment UserRolesInfoFragment_3UvyJX on Query {\n  userRoles(user_id: $id)\n}\n\nfragment UserScopesInfoFragment_3UvyJX on Query {\n  userClaims(user_id: $id) {\n    type\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "7683f4d1b1e23889d0743aacb902afa8";

export default node;
