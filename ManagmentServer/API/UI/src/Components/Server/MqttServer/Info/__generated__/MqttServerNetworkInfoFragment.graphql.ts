/**
 * @generated SignedSource<<d5888fd133615390734d6f33f0c088c1>>
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
  readonly " $fragmentType": "MqttServerNetworkInfoFragment";
};
export type MqttServerNetworkInfoFragment$key = {
  readonly " $data"?: MqttServerNetworkInfoFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerNetworkInfoFragment">;
};

const node: ReaderFragment = {
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
      "args": [
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        }
      ],
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "29db57048d1c5adf7231d458598f61bd";

export default node;
