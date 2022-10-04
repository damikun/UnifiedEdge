import clsx from "clsx";
import React from "react";
import EdgeName from "./EdgeName";
import { useFragment } from "react-relay";
import EdgeDescription from "./EdgeDescription";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../UIComponents/Section/Section";
import { SystemSettingsDataFragment$key } from "./__generated__/SystemSettingsDataFragment.graphql";
import EdgeLocation1 from "./EdgeLocation1";
import EdgeLocation2 from "./EdgeLocation2";
import EdgeLocation3 from "./EdgeLocation3";


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
    name={""}
    component={
      <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
      "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
        <div className="max-w-lg w-full">

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
  </>
}