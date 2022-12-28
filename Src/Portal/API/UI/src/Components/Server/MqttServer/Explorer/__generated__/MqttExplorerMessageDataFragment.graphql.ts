/**
 * @generated SignedSource<<583ea6e60249d18afcf5929e8af21712>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MqttExplorerMessageDataFragment$data = {
  readonly contentType: string | null;
  readonly id: string;
  readonly isJsonPayload: boolean;
  readonly isTextPayload: boolean;
  readonly isXmlPayload: boolean;
  readonly payload: ReadonlyArray<any> | null;
  readonly payloadUtf8Str: string | null;
  readonly " $fragmentType": "MqttExplorerMessageDataFragment";
};
export type MqttExplorerMessageDataFragment$key = {
  readonly " $data"?: MqttExplorerMessageDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MqttExplorerMessageDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MqttExplorerMessageDataFragment",
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
      "name": "contentType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isJsonPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isTextPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isXmlPayload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payload",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "payloadUtf8Str",
      "storageKey": null
    }
  ],
  "type": "GQL_MqttMessage",
  "abstractKey": null
};

(node as any).hash = "ebc1ea4edda62e93f19c127cedf61c6e";

export default node;
