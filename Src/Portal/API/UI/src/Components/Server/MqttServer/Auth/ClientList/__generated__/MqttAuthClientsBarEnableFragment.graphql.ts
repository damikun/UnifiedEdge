/**
 * @generated SignedSource<<a7d06bdfa4e93b5dece6db64620e7a5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthClientsBarEnableFragment$data = {
  readonly mqttServerAuthCfg: {
    readonly clientAuthEnabled: boolean;
    readonly id: string;
    readonly userAuthEnabled: boolean;
  };
  readonly " $fragmentType": "MqttAuthClientsBarEnableFragment";
};
export type MqttAuthClientsBarEnableFragment$key = {
  readonly " $data"?: MqttAuthClientsBarEnableFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthClientsBarEnableFragment">;
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
  "name": "MqttAuthClientsBarEnableFragment",
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
      "concreteType": "GQL_MqttAuthCfg",
      "kind": "LinkedField",
      "name": "mqttServerAuthCfg",
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
          "name": "clientAuthEnabled",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "userAuthEnabled",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "e65a350c032d4ab76475628ebcec5e82";

export default node;
