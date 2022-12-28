/**
 * @generated SignedSource<<d2c89084bbfa11e2aa5e0eb4c201cb19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SchedulerStatisticsFragment_jobsStatistic$data = {
  readonly jobsStatistic: {
    readonly recentFailedByDate: ReadonlyArray<{
      readonly count: any;
      readonly date: string;
    }>;
    readonly recentSucceededByDate: ReadonlyArray<{
      readonly count: any;
      readonly date: string;
    }>;
  };
  readonly " $fragmentType": "SchedulerStatisticsFragment_jobsStatistic";
};
export type SchedulerStatisticsFragment_jobsStatistic$key = {
  readonly " $data"?: SchedulerStatisticsFragment_jobsStatistic$data;
  readonly " $fragmentSpreads": FragmentRefs<"SchedulerStatisticsFragment_jobsStatistic">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "date",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "count",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SchedulerStatisticsFragment_jobsStatistic",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_JobsStatistic",
      "kind": "LinkedField",
      "name": "jobsStatistic",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_CountByDate",
          "kind": "LinkedField",
          "name": "recentFailedByDate",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_CountByDate",
          "kind": "LinkedField",
          "name": "recentSucceededByDate",
          "plural": true,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "a105c30ae889c1a915f8216b2dffefdf";

export default node;
