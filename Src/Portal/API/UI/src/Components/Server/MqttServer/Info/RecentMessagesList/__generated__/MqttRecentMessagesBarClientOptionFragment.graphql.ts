/**
 * @generated SignedSource<<26fd5a60c57efcf98b6535715c8fc398>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttRecentMessagesBarClientOptionFragment$data = {
  readonly clientId: string;
  readonly id: string;
  readonly " $fragmentType": "MqttRecentMessagesBarClientOptionFragment";
};
export type MqttRecentMessagesBarClientOptionFragment$key = {
  readonly " $data"?: MqttRecentMessagesBarClientOptionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesBarClientOptionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttRecentMessagesBarClientOptionFragment",
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
      "name": "clientId",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttClient",
  "abstractKey": null
};

(node as any).hash = "56de139a2734616bc3dacb8f06721ae8";

export default node;
