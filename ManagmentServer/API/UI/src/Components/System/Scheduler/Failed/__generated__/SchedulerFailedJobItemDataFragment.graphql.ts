/**
 * @generated SignedSource<<e3ed9f0bc25ceb61f68005882dccb726>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerFailedJobItemDataFragment$data = {
  readonly failedAt: any | null;
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
