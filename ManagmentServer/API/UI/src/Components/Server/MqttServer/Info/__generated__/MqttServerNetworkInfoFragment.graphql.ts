/**
 * @generated SignedSource<<f1060e50e2cc86d4398bbc2c76daf71f>>
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
    readonly id: string;
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
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
        (v1/*: any*/),
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
        (v1/*: any*/),
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

(node as any).hash = "7bd7933fb77c5dda87e7b6f3341ac298";

export default node;
