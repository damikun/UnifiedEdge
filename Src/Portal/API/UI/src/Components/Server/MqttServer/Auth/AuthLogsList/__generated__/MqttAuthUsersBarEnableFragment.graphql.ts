/**
 * @generated SignedSource<<a8e637b9c905825fb023774596b86920>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthUsersBarEnableFragment$data = {
  readonly mqttServerAuthCfg: {
    readonly clientAuthEnabled: boolean;
    readonly id: string;
    readonly userAuthEnabled: boolean;
  };
  readonly " $fragmentType": "MqttAuthUsersBarEnableFragment";
};
export type MqttAuthUsersBarEnableFragment$key = {
  readonly " $data"?: MqttAuthUsersBarEnableFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthUsersBarEnableFragment">;
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
  "name": "MqttAuthUsersBarEnableFragment",
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

(node as any).hash = "6cda33558b9be1db30d586540fd7990a";

export default node;
