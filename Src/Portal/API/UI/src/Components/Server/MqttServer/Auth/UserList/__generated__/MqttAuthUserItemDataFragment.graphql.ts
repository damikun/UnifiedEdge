/**
 * @generated SignedSource<<510e5352f70c12ed0b6d83557dff0f80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttAuthUserItemDataFragment$data = {
  readonly enabled: boolean;
  readonly id: string;
  readonly userName: string | null;
  readonly " $fragmentType": "MqttAuthUserItemDataFragment";
};
export type MqttAuthUserItemDataFragment$key = {
  readonly " $data"?: MqttAuthUserItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttAuthUserItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttAuthUserItemDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "enabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttAuthUser",
  "abstractKey": null
};

(node as any).hash = "788dd84a95ff83dc1730eba7b759cabc";

export default node;
