/**
 * @generated SignedSource<<60ff758ed448f3e12d25575657cb9640>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerStatisticFragment$data = {
  readonly mqttServerStats: {
    readonly connectionsCount: any;
    readonly notConsumedCount: any;
    readonly publishedTopicCount: any;
    readonly subscribedTopicCount: any;
    readonly subscriptionsCount: any;
  };
  readonly " $fragmentType": "MqttServerStatisticFragment";
};
export type MqttServerStatisticFragment$key = {
  readonly " $data"?: MqttServerStatisticFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerStatisticFragment">;
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
  "name": "MqttServerStatisticFragment",
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
      "concreteType": "GQL_MqttServerStats",
      "kind": "LinkedField",
      "name": "mqttServerStats",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "connectionsCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "notConsumedCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "publishedTopicCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "subscribedTopicCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "subscriptionsCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1c0bdce5ee9fc6f1dccca8ae38e2d2fc";

export default node;
