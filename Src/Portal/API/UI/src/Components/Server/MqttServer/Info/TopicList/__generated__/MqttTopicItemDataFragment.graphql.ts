/**
 * @generated SignedSource<<4459a79a6199158189af5f543c1324b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttTopicItemDataFragment$data = {
  readonly id: string;
  readonly serverUid: string;
  readonly stats: {
    readonly id: string;
    readonly messagesCount: any;
  };
  readonly topic: string;
  readonly " $fragmentType": "MqttTopicItemDataFragment";
};
export type MqttTopicItemDataFragment$key = {
  readonly " $data"?: MqttTopicItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttTopicItemDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttTopicItemDataFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serverUid",
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
      "concreteType": "GQL_MqttTopicStats",
      "kind": "LinkedField",
      "name": "stats",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "messagesCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_MqttTopic",
  "abstractKey": null
};
})();

(node as any).hash = "3946e38d28f1e7434c38596d727165e4";

export default node;
