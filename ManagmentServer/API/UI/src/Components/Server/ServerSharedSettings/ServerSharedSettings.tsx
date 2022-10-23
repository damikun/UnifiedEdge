import clsx from "clsx";
import React from "react";
import ServerName from "./ServerName";
import { useFragment } from "react-relay";
import ServerLocation from "./ServerLocation";
import { graphql } from "babel-plugin-relay/macro";
import ServerDescription from "./ServerDescription";
import Section from "../../../UIComponents/Section/Section";
import { ServerSharedSettingsFragment$key } from "./__generated__/ServerSharedSettingsFragment.graphql";


export const ServerSharedSettingsFragmentTag = graphql`
  fragment ServerSharedSettingsFragment on GQL_IServer 
  {
    id
    ...ServerNameDataFragment
    ...ServerLocationDataFragment
    ...ServerDescriptionDataFragment
  }
`;

export default React.memo(ServerSharedSettings)

type ServerSharedSettingsProps = {

  dataRef:ServerSharedSettingsFragment$key | null;
}

function ServerSharedSettings({dataRef}:ServerSharedSettingsProps) {

  const data = useFragment(ServerSharedSettingsFragmentTag, dataRef);
  
  return <>
  {
    data && <Section 
      name="General"
      component={
        <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
        "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-lg w-full">
            <ServerName dataRef={data}/>
            <ServerDescription dataRef={data}/>
            <ServerLocation dataRef={data}/>
          </div>
        </div>
      }
    />
  }
  </>
}