/**
 * @generated SignedSource<<2240d88d25c4a029a66c69ff693cbdd7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerMqttClientSettingsFragment$data = {
  readonly mqttServerClientConfig: {
    readonly " $fragmentSpreads": FragmentRefs<"MqttServerClientComTimeoutDataFragment" | "MqttServerClientMaxPendingMessagesDataFragment" | "MqttServerClientPresistSessionDataFragment">;
  };
  readonly " $fragmentType": "MqttServerMqttClientSettingsFragment";
};
export type MqttServerMqttClientSettingsFragment$key = {
  readonly " $data"?: MqttServerMqttClientSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerMqttClientSettingsFragment">;
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
  "name": "MqttServerMqttClientSettingsFragment",
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
      "concreteType": "GQL_MqttServerClientCfg",
      "kind": "LinkedField",
      "name": "mqttServerClientConfig",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MqttServerClientComTimeoutDataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MqttServerClientPresistSessionDataFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MqttServerClientMaxPendingMessagesDataFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "2ab684efcfc85df5e293855ba8fd4586";

export default node;
