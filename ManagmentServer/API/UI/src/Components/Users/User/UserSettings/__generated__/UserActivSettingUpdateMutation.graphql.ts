/**
 * @generated SignedSource<<0b36c65d3aa24f1506241489ef1fd55f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateUserEnabledInput = {
  enable: boolean;
  user_id: string;
};
export type UserActivSettingUpdateMutation$variables = {
  input: UpdateUserEnabledInput;
};
export type UserActivSettingUpdateMutation$data = {
  readonly updateUserEnabled: {
    readonly gQL_User: {
      readonly enabled: boolean;
      readonly id: string;
    } | null;
  };
};
export type UserActivSettingUpdateMutation = {
  response: UserActivSettingUpdateMutation$data;
  variables: UserActivSettingUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateUserEnabledPayload",
    "kind": "LinkedField",
    "name": "updateUserEnabled",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_User",
        "kind": "LinkedField",
        "name": "gQL_User",
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
            "name": "enabled",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserActivSettingUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserActivSettingUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b02ee2403916092ba44ac9bd7528faa3",
    "id": null,
    "metadata": {},
    "name": "UserActivSettingUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation UserActivSettingUpdateMutation(\n  $input: UpdateUserEnabledInput!\n) {\n  updateUserEnabled(input: $input) {\n    gQL_User {\n      id\n      enabled\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3adda6e673e71bf9da88ee7cb76bb04d";

export default node;
