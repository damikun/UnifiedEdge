/**
 * @generated SignedSource<<f95c8037f23aacd8b4c6fdcdd83a661e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesItemDataFragment$data = {
  readonly clientId: string | null;
  readonly clientUid: string | null;
  readonly id: string;
  readonly timeStamp: any;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clientId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeStamp",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttMessage",
  "abstractKey": null
};

(node as any).hash = "cbd3477feb3bad2151e3499b52b03573";

export default node;
