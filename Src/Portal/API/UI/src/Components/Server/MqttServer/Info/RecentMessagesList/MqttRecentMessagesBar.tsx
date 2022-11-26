import { useCallback, useMemo } from "react";
import { usePaginationFragment } from "react-relay";
import { MqttTopicsPaginationFragment } from "../TopicList/MqttTopics";
import { MqttClientsPaginationFragment } from "../ClientList/MqttClients";
import { defaultClinet, defaultTopic } from "./MqttRecentMessagesCtxProvider";
import SelectList, { SelectItemType } from "../../../../../UIComponents/SelectList/SelectList";
import { MqttTopicsPaginationFragment$key } from "../TopicList/__generated__/MqttTopicsPaginationFragment.graphql";
import { MqttClientsPaginationFragment$key } from "../ClientList/__generated__/MqttClientsPaginationFragment.graphql";
import { MqttTopicsPaginationFragmentRefetchQuery } from "../TopicList/__generated__/MqttTopicsPaginationFragmentRefetchQuery.graphql";
import { MqttClientsPaginationFragmentRefetchQuery } from "../ClientList/__generated__/MqttClientsPaginationFragmentRefetchQuery.graphql";


type MqttRecentMessagesBarProps={
  dataRef: (MqttClientsPaginationFragment$key | null) & 
  (MqttTopicsPaginationFragment$key | null)
  onClinetFilterChange(e:SelectItemType<string>):void
  onTopicFilterChange(e:SelectItemType<string>):void
  topic_filter:SelectItemType<string>
  client_filter:SelectItemType<string>
}

// export default React.memo(MqttRecentMessagesBar)

export default function MqttRecentMessagesBar({
  dataRef,
  onClinetFilterChange,
  onTopicFilterChange,
  topic_filter,
  client_filter
}:MqttRecentMessagesBarProps){

  const client_pagination = usePaginationFragment<
  MqttClientsPaginationFragmentRefetchQuery,
  MqttClientsPaginationFragment$key
  >(MqttClientsPaginationFragment, dataRef);

  const topic_pagination = usePaginationFragment<
  MqttTopicsPaginationFragmentRefetchQuery,
  MqttTopicsPaginationFragment$key
  >(MqttTopicsPaginationFragment, dataRef);

  const memorised_client_options = useMemo(() => {

    return client_pagination.data?.mqttServerClients?.edges?.filter(
      e=>e.node?.id !==null && 
      e.node?.id !== undefined && 
      e.node.clientId !==null
    )
    .map((enity,index)=>{
      return {
        id:enity?.node?.id as string,
        data: enity.node?.clientId as string,
        displayName: enity.node?.clientId as string
      }
    }) ?? []

  }, [client_pagination.data])


  const memorised_topic_options = useMemo(() => {

    return topic_pagination.data?.mqttServerTopics?.edges?.filter(
      e=>e.node?.id !==null && 
      e.node?.id !== undefined && 
      e.node.topic !==null
    )
    .map((enity,index)=>{
      return {
        id:enity?.node?.id as string,
        data: enity.node?.topic as string,
        displayName: enity.node?.topic as string
      }
    }) ?? []

  }, [topic_pagination.data])


  const handleClientFilterChange = useCallback(
    (data:SelectItemType<string>) => onClinetFilterChange(data),
    [onClinetFilterChange],
  )
 
  const handleTopicFilterChange = useCallback(
    (data:SelectItemType<string>) => onTopicFilterChange(data),
    [onTopicFilterChange],
  )
  
  return <div className="flex flex-row flex-none space-x-3">
    <SelectList
      onChange={handleClientFilterChange}
      options={memorised_client_options}
      value={client_filter}
      defaultValue={defaultClinet}
      disabled={false} 
    />
    <SelectList
      onChange={handleTopicFilterChange}
      options={memorised_topic_options}
      value={topic_filter}
      defaultValue={defaultTopic}
      disabled={false} 
    />
  </div> 
}