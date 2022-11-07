/**
 * @generated SignedSource<<1f42b925315d94c3cef45af990270e33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerEndpointDataFragment$data = {
  readonly mqttServerEndpoint: {
    readonly iPAddress: string;
    readonly id: string;
    readonly port: any;
    readonly serverUid: string;
  };
  readonly " $fragmentType": "MqttServerEndpointDataFragment";
};
export type MqttServerEndpointDataFragment$key = {
  readonly " $data"?: MqttServerEndpointDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerEndpointDataFragment">;
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
  "name": "MqttServerEndpointDataFragment",
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
          "name": "port",
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

(node as any).hash = "7aac0c556c4e2f3d8f50d6d8811d275b";

export default node;
