/**
 * @generated SignedSource<<b3ef22fb5afdf210176189e320711505>>
 * @relayHash 7779567b5328b3a9c5c27dbdc1c6df42
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7779567b5328b3a9c5c27dbdc1c6df42

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
    "id": "7779567b5328b3a9c5c27dbdc1c6df42",
    "metadata": {},
    "name": "UserSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "149887a7be0d81fb885ca974ddc9ba95";

export default node;
