/**
 * @generated SignedSource<<4973156963ebbd34a2acd53865b74547>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResourcesDataFragment$data = {
  readonly runtimeMetrics: {
    readonly cpuMetrics: {
      readonly threadCount: number;
      readonly totalCpuUsed: number;
    } | null;
    readonly memoryMetrics: {
      readonly memoryUssage: number;
    } | null;
  };
  readonly systemInfo: {
    readonly processName: string | null;
  };
  readonly " $fragmentType": "ResourcesDataFragment";
};
export type ResourcesDataFragment$key = {
  readonly " $data"?: ResourcesDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourcesDataFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourcesDataFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_RuntimeMetrics",
      "kind": "LinkedField",
      "name": "runtimeMetrics",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_CpuMetrics",
          "kind": "LinkedField",
          "name": "cpuMetrics",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCpuUsed",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "threadCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "GQL_MemoryMetrics",
          "kind": "LinkedField",
          "name": "memoryMetrics",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "memoryUssage",
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
      "concreteType": "GQL_SystemInfo",
      "kind": "LinkedField",
      "name": "systemInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "processName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9fc05603454e2724abf5a53b688f3d00";

export default node;
