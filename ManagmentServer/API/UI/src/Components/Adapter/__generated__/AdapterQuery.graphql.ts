/**
 * @generated SignedSource<<2e441c4230967da96f7dab1974175f3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdapterQuery$variables = {
  id: string;
};
export type AdapterQuery$data = {
  readonly adapterById: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"AdapterAddressDataFragment">;
  };
};
export type AdapterQuery = {
  response: AdapterQuery$data;
  variables: AdapterQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdapterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_Adapter",
        "kind": "LinkedField",
        "name": "adapterById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdapterAddressDataFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdapterQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GQL_Adapter",
        "kind": "LinkedField",
        "name": "adapterById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "interfaceType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "supportsIpv4",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "supportsIpv6",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "physicalAddress",
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
            "concreteType": "DTO_AdapterStatistic",
            "kind": "LinkedField",
            "name": "statistic",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bytesReceived",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bytesSent",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "DTO_AdapterAddresses",
            "kind": "LinkedField",
            "name": "addresses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dhcpServerAddresses",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dnsAddresses",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "gatewayAddresses",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "multicastAddresses",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unicastAddresses",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8918023d9fb5f1815ed964eb6f4515fe",
    "id": null,
    "metadata": {},
    "name": "AdapterQuery",
    "operationKind": "query",
    "text": "query AdapterQuery(\n  $id: ID!\n) {\n  adapterById(id: $id) {\n    name\n    ...AdapterAddressDataFragment\n    id\n  }\n}\n\nfragment AdapterAddressDataFragment on GQL_Adapter {\n  id\n  interfaceType\n  name\n  state\n  supportsIpv4\n  supportsIpv6\n  physicalAddress\n  description\n  statistic {\n    bytesReceived\n    bytesSent\n  }\n  addresses {\n    dhcpServerAddresses\n    dnsAddresses\n    gatewayAddresses\n    multicastAddresses\n    unicastAddresses\n  }\n}\n"
  }
};
})();

(node as any).hash = "6db816d46e41593507205541f079a993";

export default node;
