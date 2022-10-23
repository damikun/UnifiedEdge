import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";


export const MqttServerStatisticFragmentTag = graphql`
  fragment MqttServerStatisticFragment on Query 
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
  }
`;

export default React.memo(MqttServerStatistic)

type MqttServerStatisticProps = {
  dataRef:MqttServerStatisticFragment$key | null;
}

function MqttServerStatistic({dataRef}:MqttServerStatisticProps) {

  const data = useFragment(MqttServerStatisticFragmentTag, dataRef);
  
  return <Section 
  name="Statistic"
  component={
  <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
    "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
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
  </div>
  }/>
}