/**
 * @generated SignedSource<<4d59b9a54ab59277c3428d6ede3d60b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttLogsBarEnableFragment$data = {
  readonly mqttServerById: {
    readonly id: string;
    readonly loggingEnabled: boolean;
  };
  readonly " $fragmentType": "MqttLogsBarEnableFragment";
};
export type MqttLogsBarEnableFragment$key = {
  readonly " $data"?: MqttLogsBarEnableFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttLogsBarEnableFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "server_id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttLogsBarEnableFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "server_id"
        }
      ],
      "concreteType": "GQL_MqttServer",
      "kind": "LinkedField",
      "name": "mqttServerById",
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
          "name": "loggingEnabled",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "04e1c76ae9b3cd5607661cf69e420d81";

export default node;
