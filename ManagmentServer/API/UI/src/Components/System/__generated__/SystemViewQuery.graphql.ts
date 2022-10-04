/**
 * @generated SignedSource<<324ef52985ab99d34ee90438323ba8cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SystemViewQuery$variables = {};
export type SystemViewQuery$data = {
  readonly edgeInfo: {
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"EdgeInfoDataFragment" | "SystemSettingsDataFragment">;
};
export type SystemViewQuery = {
  response: SystemViewQuery$data;
  variables: SystemViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SystemViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "edgeInfo",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "EdgeInfoDataFragment"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SystemSettingsDataFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SystemViewQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_Edge",
        "kind": "LinkedField",
        "name": "edgeInfo",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location1",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location2",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location3",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "GQL_SystemInfo",
        "kind": "LinkedField",
        "name": "systemInfo",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "targetFramework",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "GQL_OS",
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
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9ecacb7d5b49792509e8a07b1f3b98d",
    "id": null,
    "metadata": {},
    "name": "SystemViewQuery",
    "operationKind": "query",
    "text": "query SystemViewQuery {\n  edgeInfo {\n    name\n    id\n  }\n  ...EdgeInfoDataFragment\n  ...SystemSettingsDataFragment\n}\n\nfragment EdgeDescriptionDataFragment on GQL_Edge {\n  id\n  description\n}\n\nfragment EdgeInfoDataFragment on Query {\n  systemInfo {\n    serverDateTime\n    targetFramework\n    osVersion {\n      platform\n      version\n    }\n    uptime {\n      days\n      hours\n      minutes\n    }\n    id\n  }\n  edgeInfo {\n    id\n    name\n    guid\n  }\n}\n\nfragment EdgeLocation1DataFragment on GQL_Edge {\n  id\n  location1\n}\n\nfragment EdgeLocation2DataFragment on GQL_Edge {\n  id\n  location2\n}\n\nfragment EdgeLocation3DataFragment on GQL_Edge {\n  id\n  location3\n}\n\nfragment EdgeNameDataFragment on GQL_Edge {\n  id\n  name\n}\n\nfragment SystemSettingsDataFragment on Query {\n  edgeInfo {\n    ...EdgeNameDataFragment\n    ...EdgeDescriptionDataFragment\n    ...EdgeLocation1DataFragment\n    ...EdgeLocation2DataFragment\n    ...EdgeLocation3DataFragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8282b6c7ddcf964d4de4e21418b855af";

export default node;
