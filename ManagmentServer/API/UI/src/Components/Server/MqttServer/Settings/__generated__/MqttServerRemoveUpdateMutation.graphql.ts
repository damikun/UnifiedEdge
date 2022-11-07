/**
 * @generated SignedSource<<b0cbc05f897220896dd52ae73e1839e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveServerInput = {
  id: string;
};
export type MqttServerRemoveUpdateMutation$variables = {
  connections: ReadonlyArray<string>;
  input: RemoveServerInput;
};
export type MqttServerRemoveUpdateMutation$data = {
  readonly removeServer: {
    readonly removed_id: string | null;
  };
};
export type MqttServerRemoveUpdateMutation = {
  response: MqttServerRemoveUpdateMutation$data;
  variables: MqttServerRemoveUpdateMutation$variables;
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
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "removed_id",
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
    "name": "MqttServerRemoveUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveServerPayload",
        "kind": "LinkedField",
        "name": "removeServer",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "MqttServerRemoveUpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RemoveServerPayload",
        "kind": "LinkedField",
        "name": "removeServer",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "removed_id",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2695e9723da3a72bad0d6589d495e8ca",
    "id": null,
    "metadata": {},
    "name": "MqttServerRemoveUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation MqttServerRemoveUpdateMutation(\n  $input: RemoveServerInput!\n) {\n  removeServer(input: $input) {\n    removed_id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6903dc156a1a8250b2c6a3b3c294e250";

export default node;
