/**
 * @generated SignedSource<<db8491238b95706020f29b139945957a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type GQL_ScheduleState = "Awaiting" | "Deleted" | "Enqueued" | "Failed" | "Processing" | "Scheduled" | "Succeeded" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type RecurringJobDetailDataFragment$data = {
  readonly callName?: string;
  readonly createdAt?: string | null;
  readonly cron?: string;
  readonly id?: string;
  readonly jobDetail?: {
    readonly lastState: string | null;
    readonly methodCall: string | null;
    readonly parametrs: ReadonlyArray<{
      readonly name: string;
      readonly value: string;
    }>;
  } | null;
  readonly lastExecution?: string | null;
  readonly lastJobState?: GQL_ScheduleState | null;
  readonly nextExecution?: string | null;
  readonly queue?: string;
  readonly " $fragmentType": "RecurringJobDetailDataFragment";
};
export type RecurringJobDetailDataFragment$key = {
  readonly " $data"?: RecurringJobDetailDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecurringJobDetailDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecurringJobDetailDataFragment",
  "selections": [
    {
      "kind": "InlineFragment",
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
          "name": "queue",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "createdAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cron",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_JobDetail",
          "kind": "LinkedField",
          "name": "jobDetail",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lastState",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "methodCall",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "GQL_JobParameter",
              "kind": "LinkedField",
              "name": "parametrs",
              "plural": true,
              "selections": [
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
                  "name": "value",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
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
          "name": "lastJobState",
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
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};

(node as any).hash = "eb2c7f0d85ea3a86cb93de2e53ac7242";

export default node;
