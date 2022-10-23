/**
 * @generated SignedSource<<214f977d25ffe39c5afd429d33590ae1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerNetworkInfoFragment$data = {
  readonly mqttServerEndpoint: {
    readonly iPAddress: string;
    readonly id: string;
    readonly port: any;
    readonly serverUid: string;
  };
  readonly mqttServerStats: {
    readonly packetRcvCount: any;
    readonly packetSndCount: any;
  };
  readonly " $fragmentType": "MqttServerNetworkInfoFragment";
};
export type MqttServerNetworkInfoFragment$key = {
  readonly " $data"?: MqttServerNetworkInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerNetworkInfoFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "server_uid",
    "variableName": "server_uid"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "server_uid"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttServerNetworkInfoFragment",
  "selections": [
    {
      "alias": null,
      "args": (v0/*: any*/),
      "concreteType": "GQL_MqttServerEndpoint",
      "kind": "LinkedField",
      "name": "mqttServerEndpoint",
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
      "args": (v0/*: any*/),
      "concreteType": "GQL_MqttServerStats",
      "kind": "LinkedField",
      "name": "mqttServerStats",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "packetRcvCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "packetSndCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "778f18099ad91da4ec3067f2a08a07db";

export default node;
