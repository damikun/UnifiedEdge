/**
 * @generated SignedSource<<56e8ae128d838021d8a734cafc45efb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EventType = "ERROR" | "INFO" | "WARNING" | "%future added value";
export type SystemLogDetailQuery$variables = {
  log_id: string;
};
export type SystemLogDetailQuery$data = {
  readonly systemLogById: {
    readonly iD: string;
    readonly json: string | null;
    readonly name: string;
    readonly timeStamp: string;
    readonly type: EventType;
  };
};
export type SystemLogDetailQuery = {
  response: SystemLogDetailQuery$data;
  variables: SystemLogDetailQuery$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "log_id",
        "variableName": "log_id"
      }
    ],
    "concreteType": "GQL_SystemEvent",
    "kind": "LinkedField",
    "name": "systemLogById",
    "plural": false,
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
        "name": "timeStamp",
        "storageKey": null
      },
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
        "name": "json",
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
    "name": "SystemLogDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SystemLogDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5d06a3a7edd5abe23532c4e450368a6a",
    "id": null,
    "metadata": {},
    "name": "SystemLogDetailQuery",
    "operationKind": "query",
    "text": "query SystemLogDetailQuery(\n  $log_id: ID!\n) {\n  systemLogById(log_id: $log_id) {\n    iD\n    name\n    timeStamp\n    type\n    json\n  }\n}\n"
  }
};
})();

(node as any).hash = "cfd511be16172ec2fa87e47763529bbb";

export default node;
