/**
 * @generated SignedSource<<486aeeccd81db12768028a7bc48bc4c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MqttNetLogLevel = "ERROR" | "INFO" | "VERBOSE" | "WARNING" | "%future added value";
export type InstancelogDetailQuery$variables = {
  log_uid: string;
  server_id: string;
};
export type InstancelogDetailQuery$data = {
  readonly mqttLogById: {
    readonly exception: string | null;
    readonly logLevel: MqttNetLogLevel;
    readonly message: string | null;
    readonly source: string | null;
    readonly timeStamp: any;
    readonly uid: string;
  };
};
export type InstancelogDetailQuery = {
  response: InstancelogDetailQuery$data;
  variables: InstancelogDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "log_uid"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "server_id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "log_uid",
        "variableName": "log_uid"
      },
      {
        "kind": "Variable",
        "name": "server_id",
        "variableName": "server_id"
      }
    ],
    "concreteType": "GQL_MqttServerLog",
    "kind": "LinkedField",
    "name": "mqttLogById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "uid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "source",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "message",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "logLevel",
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
        "name": "exception",
        "storageKey": null
      }
    ],
    "storageKey": null
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
    "name": "InstancelogDetailQuery",
    "selections": (v2/*: any*/),
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
    "name": "InstancelogDetailQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "51a2c21c0d951db1d29911d0dd4b2fa3",
    "id": null,
    "metadata": {},
    "name": "InstancelogDetailQuery",
    "operationKind": "query",
    "text": "query InstancelogDetailQuery(\n  $server_id: ID!\n  $log_uid: ID!\n) {\n  mqttLogById(log_uid: $log_uid, server_id: $server_id) {\n    uid\n    source\n    message\n    logLevel\n    timeStamp\n    exception\n  }\n}\n"
  }
};
})();

(node as any).hash = "f6a8c411c2b730a98f62c73611dddf40";

export default node;
