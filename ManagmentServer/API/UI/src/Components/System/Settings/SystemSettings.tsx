import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../UIComponents/Section/Section";
import { SystemSettingsDataFragment$key } from "./__generated__/SystemSettingsDataFragment.graphql";

export const SystemSettingsDataFragment = graphql`
  fragment SystemSettingsDataFragment on Query 
  {
    edgeInfo {
      name
      description
      guid
    }
  }
`;

export default React.memo(SystemSettings)

type SystemSettingsProps = {
  dataRef:SystemSettingsDataFragment$key | null;
}

function SystemSettings({dataRef}:SystemSettingsProps) {

  const data = useFragment(SystemSettingsDataFragment, dataRef);
  
  return <Section 
    name={"Addresses"}
    component={
      <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
      "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
        dsds
      </div>
    }
    />
}
