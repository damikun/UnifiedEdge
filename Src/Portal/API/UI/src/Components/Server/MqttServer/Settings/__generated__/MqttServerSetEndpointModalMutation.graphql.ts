/**
 * @generated SignedSource<<fa4c4acf165479bbb847d8edb4b4a882>>
 * @relayHash 3160645691376d18b3ef84dd62af5c24
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3160645691376d18b3ef84dd62af5c24

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SetMqttServerEndpointInput = {
  ip: string;
  port: number;
  server_uid: string;
};
export type MqttServerSetEndpointModalMutation$variables = {
  input: SetMqttServerEndpointInput;
};
export type MqttServerSetEndpointModalMutation$data = {
  readonly setMqttServerEndpoint: {
    readonly errors: ReadonlyArray<{
      readonly __typename: string;
      readonly errors?: ReadonlyArray<{
        readonly message: string | null;
        readonly property: string | null;
      }> | null;
      readonly message?: string;
    }> | null;
    readonly gQL_MqttServerEndpoint: {
      readonly iPAddress: string;
      readonly id: string;
      readonly port: any;
      readonly serverUid: string;
    } | null;
  };
};
export type MqttServerSetEndpointModalMutation = {
  response: MqttServerSetEndpointModalMutation$data;
  variables: MqttServerSetEndpointModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SetMqttServerEndpointPayload",
    "kind": "LinkedField",
    "name": "setMqttServerEndpoint",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_MqttServerEndpoint",
        "kind": "LinkedField",
        "name": "gQL_MqttServerEndpoint",
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
            "name": "iPAddress",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "port",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "serverUid",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "errors",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ErrorSource",
                "kind": "LinkedField",
                "name": "errors",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "property",
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "ValidationError",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v1/*: any*/)
            ],
            "type": "ResultError",
            "abstractKey": "__isResultError"
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
    "name": "MqttServerSetEndpointModalMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MqttServerSetEndpointModalMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "3160645691376d18b3ef84dd62af5c24",
    "metadata": {},
    "name": "MqttServerSetEndpointModalMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "807d950449b87d5d62b21786c837b315";

export default node;
