import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { MqttServerNetworkInfoFragment$key } from "./__generated__/MqttServerNetworkInfoFragment.graphql";


export const MqttServerNetworkInfoFragmentTag = graphql`
  fragment MqttServerNetworkInfoFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerEndpoint(server_uid:$server_uid) {
      id
      iPAddress
      port
      serverUid
    }

    mqttServerStats(server_uid: $server_uid) {
      packetRcvCount
      packetSndCount
    }
  }
`;

export default React.memo(MqttServerNetworkInfo)

type MqttServerNetworkInfoProps = {
  dataRef:MqttServerNetworkInfoFragment$key | null;
}

function MqttServerNetworkInfo({dataRef}:MqttServerNetworkInfoProps) {

  const data = useFragment(MqttServerNetworkInfoFragmentTag, dataRef);
  
  return <Section 
  name="Network"
  component={
  <div className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm p-5 space-y-2")}>

      <div className="flex flex-col lg:flex-row lg:space-x-10 justify-between 2xl:justify-start">
      <FieldGroup>
        <FieldSection
        variant="flex-row"
        name="Port">
          <div className="font-mono">
            {data?.mqttServerEndpoint.port}
          </div>
        </FieldSection>
        <FieldSection
        variant="flex-row"
        name="IP Address">
          <div className="font-mono">
            {data?.mqttServerEndpoint.iPAddress}
          </div>
        </FieldSection>
      </FieldGroup>

      <FieldGroup>
        <FieldSection
        variant="flex-row"
        name="Inbound">
          <div className="font-mono truncate">
            {data?.mqttServerStats.packetSndCount}
          </div>
        </FieldSection>
        <FieldSection
        variant="flex-row"
        name="Outbound  ">
          <div className="font-mono truncate">
            {data?.mqttServerStats.packetRcvCount}
          </div>
        </FieldSection>
      </FieldGroup>
    </div>
  </div>
  }/>
}