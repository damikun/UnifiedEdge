/**
 * @generated SignedSource<<1b6acf058a1c88995988b21c08c2bf97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuccessJobDetailDataFragment$data = {
  readonly id?: string;
  readonly jobDetail?: {
    readonly lastState: string | null;
    readonly methodCall: string | null;
    readonly parametrs: ReadonlyArray<{
      readonly name: string;
      readonly value: string;
    }>;
  } | null;
  readonly name?: string;
  readonly succeededAt?: string | null;
  readonly totalDuration?: any | null;
  readonly " $fragmentType": "SuccessJobDetailDataFragment";
};
export type SuccessJobDetailDataFragment$key = {
  readonly " $data"?: SuccessJobDetailDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuccessJobDetailDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuccessJobDetailDataFragment",
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
        (v0/*: any*/),
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
              "concreteType": "GQL_JobParameter",
              "kind": "LinkedField",
              "name": "parametrs",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "value",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "methodCall",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "GQL_SuccessJob",
      "abstractKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
})();

(node as any).hash = "b36649982f50fd7975d1ec129f849093";

export default node;
