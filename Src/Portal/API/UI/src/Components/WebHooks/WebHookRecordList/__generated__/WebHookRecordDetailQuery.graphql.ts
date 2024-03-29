/**
 * @generated SignedSource<<c4a1a59c925645ecfdd15d47e78ec3a7>>
 * @relayHash 7032f311b8d1338848354bf8f9f2d81e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7032f311b8d1338848354bf8f9f2d81e

import { ConcreteRequest, Query } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
export type RecordResult = "HTTP" | "OK" | "PARAM" | "QUERY" | "UNDEFINED" | "%future added value";
export type WebHookRecordDetailQuery$variables = {
  record_id: string;
};
export type WebHookRecordDetailQuery$data = {
  readonly webHookRecordById: {
    readonly exception: string | null;
    readonly guid: string;
    readonly hookEventGroup: HookEventGroup;
    readonly id: string;
    readonly isJsonResponse: boolean | null;
    readonly isTextHtmlResponse: boolean | null;
    readonly requestBody: string;
    readonly requestHeaders: string;
    readonly responseBody: string | null;
    readonly responseContentType: string | null;
    readonly result: RecordResult;
    readonly statusCode: number;
    readonly timestamp: string;
  };
};
export type WebHookRecordDetailQuery = {
  response: WebHookRecordDetailQuery$data;
  variables: WebHookRecordDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "record_id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "record_id",
        "variableName": "record_id"
      }
    ],
    "concreteType": "GQL_WebHookRecord",
    "kind": "LinkedField",
    "name": "webHookRecordById",
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
        "name": "statusCode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "timestamp",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hookEventGroup",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "guid",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "exception",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requestHeaders",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requestBody",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "responseBody",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isJsonResponse",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isTextHtmlResponse",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "responseContentType",
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
    "name": "WebHookRecordDetailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WebHookRecordDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "7032f311b8d1338848354bf8f9f2d81e",
    "metadata": {},
    "name": "WebHookRecordDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7917cb14bf4aea22aa3b34744e13e6a4";

export default node;
