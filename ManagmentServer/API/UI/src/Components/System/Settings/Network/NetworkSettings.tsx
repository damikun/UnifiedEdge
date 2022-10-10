import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import NetworkDefaultAdapter from "./NetworkDefaultAdapter";
import Section from "../../../../UIComponents/Section/Section";
import { NetworkSettingsDataFragment$key } from "./__generated__/NetworkSettingsDataFragment.graphql";


export const NetworkSettingsDataFragmentTag = graphql`
  fragment NetworkSettingsDataFragment on Query 
  {
    ...NetworkDefaultAdapterDataFragment
  }
`;

export default React.memo(NetworkSettings)

type NetworkSettingsProps = {
  dataRef:NetworkSettingsDataFragment$key | null;
}

function NetworkSettings({dataRef}:NetworkSettingsProps) {

  const data = useFragment(NetworkSettingsDataFragmentTag, dataRef);
  
  return <Section 
    name="Network"
    component={
      <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
        "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
        <div className="max-w-lg w-full">
          <NetworkDefaultAdapter dataRef={data}/>
        </div>
      </div>
    }
  />
}