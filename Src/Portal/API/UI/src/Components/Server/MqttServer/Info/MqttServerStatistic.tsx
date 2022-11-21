import clsx from "clsx";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import Section from "../../../../UIComponents/Section/Section";
import SectionBody from "../../../../UIComponents/Section/SectionBody";
import { MqttServerStatisticFragment$key } from "./__generated__/MqttServerStatisticFragment.graphql";
import { MqttServerStatisticSubSubscription } from "./__generated__/MqttServerStatisticSubSubscription.graphql";
import { MqttServerStatisticTopicSubscription } from "./__generated__/MqttServerStatisticTopicSubscription.graphql";
import { MqttServerStatisticClientsSubscription } from "./__generated__/MqttServerStatisticClientsSubscription.graphql";


export const MqttServerStatisticFragmentTag = graphql`
  fragment MqttServerStatisticFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerStats(server_uid: $server_uid) {
      id
      connectionsCount
      notConsumedCount
      publishedTopicCount
      subscribedTopicCount
      subscriptionsCount
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttServerStatisticClientsRef = graphql`
    subscription MqttServerStatisticClientsSubscription(
      $id:ID!
    ) {
      mqttServerMetrics(server_id: $id, metric: CONNECTED_CLIENTS) {
        id
        timeStamp
        unit
        value
      }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttServerStatisticSubRef = graphql`
    subscription MqttServerStatisticSubSubscription(
      $id:ID!
    ) {
      mqttServerMetrics(server_id: $id, metric: TOPIC_SUBSCRIPTIONS) {
        id
        timeStamp
        unit
        value
      }
    }
`;


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttServerStatisticTopicRef = graphql`
    subscription MqttServerStatisticTopicSubscription(
      $id:ID!
    ) {
      mqttServerMetrics(server_id: $id, metric: TOPICS) {
        id
        timeStamp
        unit
        value
      }
    }
`;


export default React.memo(MqttServerStatistic)

type MqttServerStatisticProps = {
  dataRef:MqttServerStatisticFragment$key | null;
}

function MqttServerStatistic({dataRef}:MqttServerStatisticProps) {

  const data = useFragment(MqttServerStatisticFragmentTag, dataRef);
  
  const { id }: any = useParams<string>();
  
  const topic_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttServerStatisticTopicRef,
    updater: (store,element) => { 
      if(element.mqttServerMetrics.id && data?.mqttServerStats?.id){
        var server_data = store.get(data?.mqttServerStats?.id);
        
        server_data?.setValue(element.mqttServerMetrics.value,"publishedTopicCount")
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttServerStatisticTopicSubscription>), [id,data?.mqttServerStats?.id]);

  useSubscription<MqttServerStatisticTopicSubscription>(topic_sub);

    
  const sub_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttServerStatisticSubRef,
    updater: (store,element) => { 
      if(element.mqttServerMetrics.id && data?.mqttServerStats?.id){
        var server_data = store.get(data?.mqttServerStats?.id);
        
        server_data?.setValue(element.mqttServerMetrics.value,"subscriptionsCount")
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttServerStatisticSubSubscription>), [id,data?.mqttServerStats?.id]);

  useSubscription<MqttServerStatisticSubSubscription>(sub_sub);

    
  const clients_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttServerStatisticClientsRef,
    updater: (store,element) => { 
      if(element.mqttServerMetrics.id && data?.mqttServerStats?.id){
        var server_data = store.get(data?.mqttServerStats?.id);
        
        server_data?.setValue(element.mqttServerMetrics.value,"connectionsCount")
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttServerStatisticClientsSubscription>), [id,data?.mqttServerStats?.id]);

  useSubscription<MqttServerStatisticClientsSubscription>(clients_sub);
  return <Section 
  name="Statistic"
  component={
    <SectionBody className={clsx("flex flex-row justify-around",
    "h-full space-x-2 space-y-0 items-center align-middle")}>
      <div className="flex flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.connectionsCount}
        </div>
        <div className="font-semibold">Connections</div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.publishedTopicCount}
        </div>
        <div className="font-semibold">Topics</div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-xl font-semibold">
          {data?.mqttServerStats.subscriptionsCount}
        </div>
        <div className="font-semibold">Subscriptions</div>
      </div>
    </SectionBody>
  }/>
}