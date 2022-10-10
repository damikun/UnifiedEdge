/**
 * @generated SignedSource<<a1ebd97d259f6e0c9fc316d6cc429a9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerNetworkSettingsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerEndpointDataFragment">;
  readonly " $fragmentType": "MqttServerNetworkSettingsFragment";
};
export type MqttServerNetworkSettingsFragment$key = {
  readonly " $data"?: MqttServerNetworkSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerNetworkSettingsFragment">;
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
  "name": "MqttServerNetworkSettingsFragment",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "server_uid",
          "variableName": "server_uid"
        }
      ],
      "kind": "FragmentSpread",
      "name": "MqttServerEndpointDataFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9c82e6f595f1092e8fbd52eac9d97a6c";

export default node;
