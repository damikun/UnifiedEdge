/**
 * @generated SignedSource<<c652ff7a92cbafb90478d56fb88f7167>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_ScheduleState = "Awaiting" | "Deleted" | "Enqueued" | "Failed" | "Processing" | "Scheduled" | "Succeeded" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SchedulerRecurringJobItemDataFragment$data = {
  readonly callName: string;
  readonly id: string;
  readonly lastExecution: string | null;
  readonly lastJobState: GQL_ScheduleState | null;
  readonly nextExecution: string | null;
  readonly " $fragmentType": "SchedulerRecurringJobItemDataFragment";
};
export type SchedulerRecurringJobItemDataFragment$key = {
  readonly " $data"?: SchedulerRecurringJobItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerRecurringJobItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchedulerRecurringJobItemDataFragment",
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
      "name": "callName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastJobState",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastExecution",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextExecution",
      "storageKey": null
    }
  ],
  "type": "GQL_RecurringJob",
  "abstractKey": null
};

(node as any).hash = "94306b7699b3112e9d3aa3ce62ed01b7";

export default node;
