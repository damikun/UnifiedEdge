/**
 * @generated SignedSource<<1b87cbfaadcc937f572db2872746da24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicItemDataFragment$data = {
  readonly count: any;
  readonly id: string;
  readonly topic: string;
  readonly " $fragmentType": "MqttTopicItemDataFragment";
};
export type MqttTopicItemDataFragment$key = {
  readonly " $data"?: MqttTopicItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttTopicItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttTopicItemDataFragment",
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
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "count",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttServerTopicStat",
  "abstractKey": null
};

(node as any).hash = "993dd631acebb54e62aa782893f6b348";

export default node;
