import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import React, { useCallback, useEffect, useState } from "react";
import Section from "../../../../../UIComponents/Section/Section";
import { MqttRecentMessagesItem } from "./MqttRecentMessagesItem";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttRecentMessagesPaginationFragment$key } from "./__generated__/MqttRecentMessagesPaginationFragment.graphql";
import { MqttRecentMessagesPaginationFragmentRefetchQuery } from "./__generated__/MqttRecentMessagesPaginationFragmentRefetchQuery.graphql";


const MqttRecentMessagesPaginationFragment = graphql`
  fragment MqttRecentMessagesPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttRecentMessagesPaginationFragmentRefetchQuery") {
    __id
    mqttServerRecentMessages(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttRecentMessagesPaginationFragmentConnection_mqttServerRecentMessages") {
      __id
      edges {
        node {
          id
          ...MqttRecentMessagesItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(MqttRecentMessages)

type MqttRecentMessagesProps = {
  dataRef: MqttRecentMessagesPaginationFragment$key | null;
}

function MqttRecentMessages({dataRef}:MqttRecentMessagesProps) {

  return <Section 
    name={"Recent Messages"}
    component={
      <InfinityScrollTable
        header={<Header/>}
      >
        <TopicListBody dataRef={dataRef}/>
      </InfinityScrollTable>
    }
  />
}


type TopicListBodyProps = {

}&MqttRecentMessagesProps

function TopicListBody({dataRef}:TopicListBodyProps){

  const { id }: any = useParams<string>();

  const pagination = usePaginationFragment<
  MqttRecentMessagesPaginationFragmentRefetchQuery,
  MqttRecentMessagesPaginationFragment$key
  >(MqttRecentMessagesPaginationFragment, dataRef);

  const [connectionId, setConnectionId] = useState<string | undefined>(pagination.data?.mqttServerRecentMessages?.__id);

  useEffect(() => {
    setConnectionId(pagination.data?.mqttServerRecentMessages?.__id)
  }, [pagination.data?.mqttServerRecentMessages?.__id])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {

    },
    []
  );

  return <InfinityScrollBody
  height="h-72"
  onEnd={handleLoadMore}
  >
    {
      pagination?.data?.mqttServerRecentMessages?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttRecentMessagesItem 
          key={edge.node?.id??index}
          dataRef={edge.node}
          onItemClick={handleItemDetail}
        />
      })
    }
</InfinityScrollBody>

}

function Header(){
  return <TableHeader>
    <tr className="flex w-6/12 2xl:w-3/12">
      <th>Client</th>
    </tr>
    <tr className="w-6/12 2xl:w-6/12 hidden 2xl:flex">
      <th>Topic</th>
    </tr>
    <tr className="flex justify-center items-center text-center w-5/12 2xl:w-3/12">
      <th>TimeStamp</th>
    </tr>
  </TableHeader>
}