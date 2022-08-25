/**
 * @generated SignedSource<<9dc9aa446f01cd2ef0eed02d2dba7692>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PlatformID = "MAC_OSX" | "OTHER" | "UNIX" | "WIN32_NT" | "WIN32_S" | "WIN32_WINDOWS" | "WIN_CE" | "XBOX" | "%future added value";
export type EdgeInfoDataQuery$variables = {};
export type EdgeInfoDataQuery$data = {
  readonly edgeInfo: {
    readonly guid: string;
    readonly name: string;
  };
  readonly osVersion: {
    readonly platform: PlatformID;
    readonly version: string | null;
  };
  readonly serverDateTime: any;
  readonly targetFramework: string;
  readonly uptime: {
    readonly days: number;
    readonly hours: number;
    readonly minutes: number;
  };
};
export type EdgeInfoDataQuery = {
  response: EdgeInfoDataQuery$data;
  variables: EdgeInfoDataQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "serverDateTime",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "GQL_Uptime",
    "kind": "LinkedField",
    "name": "uptime",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "days",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hours",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "minutes",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "targetFramework",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "DTO_OS",
    "kind": "LinkedField",
    "name": "osVersion",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "platform",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "version",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "GQL_Edge",
    "kind": "LinkedField",
    "name": "edgeInfo",
    "plural": false,
    "selections": [
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
        "name": "guid",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "EdgeInfoDataQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "EdgeInfoDataQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d5a9e192fc83d512a71e024b6cc00a5a",
    "id": null,
    "metadata": {},
    "name": "EdgeInfoDataQuery",
    "operationKind": "query",
    "text": "query EdgeInfoDataQuery {\n  serverDateTime\n  uptime {\n    days\n    hours\n    minutes\n  }\n  targetFramework\n  osVersion {\n    platform\n    version\n  }\n  edgeInfo {\n    name\n    guid\n  }\n}\n"
  }
};
})();

(node as any).hash = "b076dedb4c593edbe943c873c5ba3f07";

export default node;
