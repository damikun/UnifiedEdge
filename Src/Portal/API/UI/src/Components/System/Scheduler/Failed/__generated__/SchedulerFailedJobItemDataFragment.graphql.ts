/**
 * @generated SignedSource<<56f38ca57fbf4221f7adbb3af01c3fc3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerFailedJobItemDataFragment$data = {
  readonly failedAt: string | null;
  readonly id: string;
  readonly jobName: string | null;
  readonly reason: string;
  readonly " $fragmentType": "SchedulerFailedJobItemDataFragment";
};
export type SchedulerFailedJobItemDataFragment$key = {
  readonly " $data"?: SchedulerFailedJobItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerFailedJobItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchedulerFailedJobItemDataFragment",
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
      "name": "jobName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "failedAt",
      "storageKey": null
    }
  ],
  "type": "GQL_FailedJob",
  "abstractKey": null
};

(node as any).hash = "6e950646c6f48d34bc3d4dff3e5c76ac";

export default node;
