/**
 * @generated SignedSource<<b1e631a50930b75205bf646f37a21e1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttServerRemoveDataFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "MqttServerRemoveDataFragment";
};
export type MqttServerRemoveDataFragment$key = {
  readonly " $data"?: MqttServerRemoveDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttServerRemoveDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttServerRemoveDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};

(node as any).hash = "81f1ed2eb83b96084f36b4a949a8236d";

export default node;
