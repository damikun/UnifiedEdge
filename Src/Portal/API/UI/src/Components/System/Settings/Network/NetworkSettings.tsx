import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import NetworkDefaultAdapter from "./NetworkDefaultAdapter";
import Section from "../../../../UIComponents/Section/Section";
import { NetworkSettingsDataFragment$key } from "./__generated__/NetworkSettingsDataFragment.graphql";
import SectionBody from "../../../../UIComponents/Section/SectionBody";


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
      <SectionBody>
        <div className="max-w-lg w-full py-3">
          <NetworkDefaultAdapter dataRef={data}/>
        </div>
      </SectionBody>
    }
  />
}