/**
 * @generated SignedSource<<cca4499774b6ca013014031df826433a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FailedJobDetailDataFragment$data = {
  readonly exceptionDetails?: string;
  readonly exceptionMessage?: string;
  readonly exceptionType?: string;
  readonly failedAt?: any | null;
  readonly inFailedState?: boolean;
  readonly jobDetail?: {
    readonly lastState: string | null;
    readonly methodCall: string | null;
    readonly parametrs: ReadonlyArray<{
      readonly name: string;
      readonly value: string;
    }>;
  } | null;
  readonly jobName?: string | null;
  readonly reason?: string;
  readonly " $fragmentType": "FailedJobDetailDataFragment";
};
export type FailedJobDetailDataFragment$key = {
  readonly " $data"?: FailedJobDetailDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FailedJobDetailDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FailedJobDetailDataFragment",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "exceptionDetails",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "exceptionMessage",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "exceptionType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "failedAt",
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
          "name": "reason",
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
          "name": "inFailedState",
          "storageKey": null
        }
      ],
      "type": "GQL_FailedJob",
      "abstractKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};

(node as any).hash = "0684ce14eed18b6730251a5cc622942f";

export default node;
