/**
 * @generated SignedSource<<48b54ec521d9f492e8a3c3d0e040ef81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesItemDataFragment$data = {
  readonly clientUid: string | null;
  readonly id: string;
  readonly topic: string;
  readonly " $fragmentType": "MqttRecentMessagesItemDataFragment";
};
export type MqttRecentMessagesItemDataFragment$key = {
  readonly " $data"?: MqttRecentMessagesItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttRecentMessagesItemDataFragment",
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
      "name": "clientUid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "topic",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttMessage",
  "abstractKey": null
};

(node as any).hash = "63628fe5e82e86c290c7138568b72af6";

export default node;
