/**
 * @generated SignedSource<<d0aec5e8b0d228cc0169137b280c8348>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSettingsQuery$variables = {
  current_user_id: string;
  user_id: string;
};
export type UserSettingsQuery$data = {
  readonly isAdmin: {
    readonly isAdmin: boolean;
  };
  readonly me: {
    readonly id: string;
  } | null;
  readonly userById: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SetPasswordDataFragment" | "UserActivSettingDataFragment" | "UserFirstNameSettingDataFragment" | "UserLastNameSettingDataFragment" | "UserRemoveDataFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"UserAdminSettingDataFragment">;
};
export type UserSettingsQuery = {
  response: UserSettingsQuery$data;
  variables: UserSettingsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "current_user_id"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "user_id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "user_id",
    "variableName": "user_id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isAdmin",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "user_id",
      "variableName": "current_user_id"
    }
  ],
  "concreteType": "IsAdminResult",
  "kind": "LinkedField",
  "name": "isAdmin",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "GQL_User",
  "kind": "LinkedField",
  "name": "me",
  "plural": false,
  "selections": [
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "userById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserFirstNameSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserLastNameSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserActivSettingDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserRemoveDataFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SetPasswordDataFragment"
          }
        ],
        "storageKey": null
      },
      (v5/*: any*/),
      (v6/*: any*/),
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "UserAdminSettingDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "userById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
            "name": "enabled",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v5/*: any*/),
      (v6/*: any*/),
      {
        "alias": "user",
        "args": (v2/*: any*/),
        "concreteType": "IsAdminResult",
        "kind": "LinkedField",
        "name": "isAdmin",
        "plural": false,
        "selections": (v4/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7779567b5328b3a9c5c27dbdc1c6df42",
    "id": null,
    "metadata": {},
    "name": "UserSettingsQuery",
    "operationKind": "query",
    "text": "query UserSettingsQuery(\n  $user_id: ID!\n  $current_user_id: ID!\n) {\n  userById(user_id: $user_id) {\n    id\n    ...UserFirstNameSettingDataFragment\n    ...UserLastNameSettingDataFragment\n    ...UserActivSettingDataFragment\n    ...UserRemoveDataFragment\n    ...SetPasswordDataFragment\n  }\n  isAdmin(user_id: $current_user_id) {\n    isAdmin\n  }\n  me {\n    id\n  }\n  ...UserAdminSettingDataFragment_121sjE\n}\n\nfragment SetPasswordDataFragment on GQL_User {\n  id\n}\n\nfragment UserActivSettingDataFragment on GQL_User {\n  id\n  enabled\n}\n\nfragment UserAdminSettingDataFragment_121sjE on Query {\n  userById(user_id: $user_id) {\n    id\n  }\n  user: isAdmin(user_id: $user_id) {\n    isAdmin\n  }\n}\n\nfragment UserFirstNameSettingDataFragment on GQL_User {\n  id\n  firstName\n}\n\nfragment UserLastNameSettingDataFragment on GQL_User {\n  id\n  lastName\n}\n\nfragment UserRemoveDataFragment on GQL_User {\n  id\n}\n"
  }
};
})();

(node as any).hash = "149887a7be0d81fb885ca974ddc9ba95";

export default node;
