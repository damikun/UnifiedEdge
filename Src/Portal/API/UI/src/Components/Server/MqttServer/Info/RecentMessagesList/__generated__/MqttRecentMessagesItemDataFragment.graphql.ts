/**
 * @generated SignedSource<<825290a0b780df06610c50ac71a57311>>
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
  readonly timeStamp: string;
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
