import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import SectionBody from "../../../../UIComponents/Section/SectionBody";
import MqttServerClientComTimeout from "./ServerClientConfig/MqttServerClientComTimeout";
import MqttServerClientPresistSession from "./ServerClientConfig/MqttServerClientPresistSession";
import MqttServerClientMaxPendingMessages from "./ServerClientConfig/MqttServerClientMaxPendingMessages";
import { MqttServerMqttClientSettingsFragment$key } from "./__generated__/MqttServerMqttClientSettingsFragment.graphql";


export const MqttServerMqttClientSettingsFragmentTag = graphql`
  fragment MqttServerMqttClientSettingsFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerClientConfig(server_uid: $server_uid) {
      ...MqttServerClientComTimeoutDataFragment
      ...MqttServerClientPresistSessionDataFragment
      ...MqttServerClientMaxPendingMessagesDataFragment
    }
  }
`;

export default React.memo(MqttServerMqttClientSettings)

type MqttServerMqttClientSettingsProps = {
  dataRef:MqttServerMqttClientSettingsFragment$key | null;
}

function MqttServerMqttClientSettings({dataRef}:MqttServerMqttClientSettingsProps) {

  const data = useFragment(MqttServerMqttClientSettingsFragmentTag, dataRef);

  return <Section 
    name="Clients"
    component={
      <SectionBody className="flex flex-col">
        <div className="max-w-lg w-full">
          <MqttServerClientComTimeout dataRef={data?.mqttServerClientConfig}/>
          <MqttServerClientMaxPendingMessages dataRef={data?.mqttServerClientConfig}/>
          <MqttServerClientPresistSession dataRef={data?.mqttServerClientConfig}/>
        </div>
      </SectionBody>
  }
  />
}