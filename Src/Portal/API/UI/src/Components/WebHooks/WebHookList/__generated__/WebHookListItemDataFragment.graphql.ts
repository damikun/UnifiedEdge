/**
 * @generated SignedSource<<650f3f008c0515650461ac0e8a93fb1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type HookEventGroup = "MQTT" | "OPC" | "S7" | "SYSTEM" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type WebHookListItemDataFragment$data = {
  readonly contentType: string;
  readonly eventGroup: ReadonlyArray<HookEventGroup>;
  readonly id: string;
  readonly isActive: boolean;
  readonly lastTrigger: string | null;
  readonly name: string;
  readonly secret: string | null;
  readonly serverUid: string | null;
  readonly webHookUrl: string;
  readonly " $fragmentType": "WebHookListItemDataFragment";
};
export type WebHookListItemDataFragment$key = {
  readonly " $data"?: WebHookListItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"WebHookListItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WebHookListItemDataFragment",
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
      "name": "name",
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
      "name": "eventGroup",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastTrigger",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "secret",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "webHookUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "serverUid",
      "storageKey": null
    }
  ],
  "type": "GQL_WebHook",
  "abstractKey": null
};

(node as any).hash = "b0470c6b136c7599a1540659147705ff";

export default node;
