import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import { MqttServerStatisticFragment$key } from "./__generated__/MqttServerStatisticFragment.graphql";


export const MqttServerStatisticFragmentTag = graphql`
  fragment MqttServerStatisticFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerStats(server_uid: $server_uid) {
      connectionsCount
      notConsumedCount
      publishedTopicCount
      subscribedTopicCount
      subscriptionsCount
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
  <div className={clsx("flex flex-row bg-gray-100 w-full",
    "border border-gray-200 rounded-sm shadow-sm p-5 w-full",
    "space-x-2 justify-around h-full align-middle")}>

      <div className="flex-flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.connectionsCount}
        </div>
        <div className="font-semibold">Connections</div>
      </div>

      <div className="flex-flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.publishedTopicCount}
        </div>
        <div className="font-semibold">Topics</div>
      </div>

      <div className="flex-flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.subscriptionsCount}
        </div>
        <div className="font-semibold">Subscriptions</div>
      </div>
  </div>
  }/>
}