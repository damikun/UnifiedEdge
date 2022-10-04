/**
 * @generated SignedSource<<6641041b796ab420a9b7359bc883b237>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerSuccessJobItemDataFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly succeededAt: any | null;
  readonly totalDuration: any | null;
  readonly " $fragmentType": "SchedulerSuccessJobItemDataFragment";
};
export type SchedulerSuccessJobItemDataFragment$key = {
  readonly " $data"?: SchedulerSuccessJobItemDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerSuccessJobItemDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchedulerSuccessJobItemDataFragment",
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
      "name": "succeededAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalDuration",
      "storageKey": null
    }
  ],
  "type": "GQL_SuccessJob",
  "abstractKey": null
};

(node as any).hash = "ac89d11c902260721e6b4604d6dc3fc0";

export default node;
