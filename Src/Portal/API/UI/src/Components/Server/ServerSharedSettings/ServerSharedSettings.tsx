import clsx from "clsx";
import React from "react";
import ServerName from "./ServerName";
import { useFragment } from "react-relay";
import ServerLocation from "./ServerLocation";
import { graphql } from "babel-plugin-relay/macro";
import ServerDescription from "./ServerDescription";
import Section from "../../../UIComponents/Section/Section";
import { ServerSharedSettingsFragment$key } from "./__generated__/ServerSharedSettingsFragment.graphql";
import SectionBody from "../../../UIComponents/Section/SectionBody";


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
        <SectionBody>
          <div className="max-w-lg w-full">
            <ServerName dataRef={data}/>
            <ServerDescription dataRef={data}/>
            <ServerLocation dataRef={data}/>
          </div>
        </SectionBody>
      }
    />
  }
  </>
}