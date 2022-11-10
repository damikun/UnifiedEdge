import clsx from "clsx";
import React from "react";
import EdgeName from "./Edge/EdgeName";
import { useFragment } from "react-relay";
import EdgeLocation1 from "./Edge//EdgeLocation1";
import EdgeLocation2 from "./Edge/EdgeLocation2";
import EdgeLocation3 from "./Edge/EdgeLocation3";
import EdgeDescription from "./Edge/EdgeDescription";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../UIComponents/Section/Section";
import { SystemSettingsDataFragment$key } from "./__generated__/SystemSettingsDataFragment.graphql";
import NetworkSettings from "./Network/NetworkSettings";


export const SystemSettingsDataFragmentTag = graphql`
  fragment SystemSettingsDataFragment on Query 
  {
    edgeInfo {
      ...EdgeNameDataFragment
      ...EdgeDescriptionDataFragment
      ...EdgeLocation1DataFragment
      ...EdgeLocation2DataFragment
      ...EdgeLocation3DataFragment
    }
    ...NetworkSettingsDataFragment
  }
`;

export default React.memo(SystemSettings)

type SystemSettingsProps = {
  dataRef:SystemSettingsDataFragment$key | null;
}

function SystemSettings({dataRef}:SystemSettingsProps) {

  const data = useFragment(SystemSettingsDataFragmentTag, dataRef);
  
  return <>
  {
    data?.edgeInfo && <Section
      name="System"
      component={
        <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
        "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-lg w-full py-3">

            <EdgeName dataRef={data?.edgeInfo}/>
            <EdgeDescription dataRef={data?.edgeInfo}/>
            
            <div className="mt-5">
              <EdgeLocation1 dataRef={data?.edgeInfo}/>
              <EdgeLocation2 dataRef={data?.edgeInfo}/>
              <EdgeLocation3 dataRef={data?.edgeInfo}/>
            </div>

          </div>
        </div>
      }
      />
  }
    <NetworkSettings dataRef={data}/>
  </>
}