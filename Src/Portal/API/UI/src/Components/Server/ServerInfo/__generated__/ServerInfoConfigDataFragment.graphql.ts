/**
 * @generated SignedSource<<0997452a557a5c2f17142897cd6cd91c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ServerInfoConfigDataFragment$data = {
  readonly configState: {
    readonly isConfigMatch: boolean;
    readonly offlineTimeStamp: string | null;
    readonly onlineTimeStamp: string | null;
  } | null;
  readonly isConfigMatch: boolean | null;
  readonly " $fragmentType": "ServerInfoConfigDataFragment";
};
export type ServerInfoConfigDataFragment$key = {
  readonly " $data"?: ServerInfoConfigDataFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ServerInfoConfigDataFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isConfigMatch",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ServerInfoConfigDataFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "GQL_ServerConfigState",
      "kind": "LinkedField",
      "name": "configState",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "offlineTimeStamp",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onlineTimeStamp",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GQL_IServer",
  "abstractKey": "__isGQL_IServer"
};
})();

(node as any).hash = "bd6493573e5fd16a76058da4ee608c51";

export default node;
