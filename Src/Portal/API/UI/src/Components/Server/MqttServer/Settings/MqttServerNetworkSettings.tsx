import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MqttServerEndpoint from "./MqttServerEndpoint";
import Section from "../../../../UIComponents/Section/Section";
import { MqttServerNetworkSettingsFragment$key } from "./__generated__/MqttServerNetworkSettingsFragment.graphql";
import SectionBody from "../../../../UIComponents/Section/SectionBody";


export const MqttServerNetworkSettingsFragmentTag = graphql`
  fragment MqttServerNetworkSettingsFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    ...MqttServerEndpointDataFragment @arguments(server_uid:$server_uid)
  }
`;

export default React.memo(MqttServerNetworkSettings)

type MqttServerNetworkSettingsProps = {
  dataRef:MqttServerNetworkSettingsFragment$key | null;
}

function MqttServerNetworkSettings({dataRef}:MqttServerNetworkSettingsProps) {

  const data = useFragment(MqttServerNetworkSettingsFragmentTag, dataRef);

  return <Section 
    name="Network"
    component={
      <SectionBody className="flex flex-col">
        <div className="max-w-lg w-full">
          <MqttServerEndpoint dataRef={data}/>
        </div>
      </SectionBody>
  }
  />
}