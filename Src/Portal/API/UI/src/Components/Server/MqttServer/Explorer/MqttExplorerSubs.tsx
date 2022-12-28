import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import MqttExplorerSubsBar from "./MqttExplorerSubsBar";
import { MqttExplorerSubItem } from "./MqttExplorerSubItem";
import Section from "../../../../UIComponents/Section/Section";
import React, { useCallback, useEffect, useState } from "react";
import InfinityScrollBody from "../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import { MqttExplorerSubCtxProvider, useMqttExplorerSubCtx } from "./MqttExplorerSubCtx";
import { MqttExplorerSubsPaginationFragment$key } from "./__generated__/MqttExplorerSubsPaginationFragment.graphql";
import { MqttExplorerSubsPaginationFragmentRefetchQuery } from "./__generated__/MqttExplorerSubsPaginationFragmentRefetchQuery.graphql";


export const MqttExplorerSubsPaginationFragmentTag = graphql`
  fragment MqttExplorerSubsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttExplorerSubsPaginationFragmentRefetchQuery") {
    __id
    mqttExplorerUserStoredSubs(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttExplorerSubsPaginationFragmentConnection_mqttExplorerUserStoredSubs") {
      __id
      edges {
        node {
          id
          ...MqttExplorerSubItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(MqttExplorerSubs)

type MqttExplorerSubsProps = {
  dataRef: (MqttExplorerSubsPaginationFragment$key | null) 
}

function MqttExplorerSubs({dataRef}:MqttExplorerSubsProps) {

  return <MqttExplorerSubCtxProvider>
    <Section 
      name={"Subsciptions"}
      bar={<MqttExplorerSubsBar/>}
      component={
        <InfinityScrollTable
          height="h-full"
        > 
          <MqttExplorerSubsBody dataRef={dataRef}/>
        </InfinityScrollTable>
      }
    />
  </MqttExplorerSubCtxProvider>
}

type MqttExplorerSubsBodyProps = {
  dataRef: (MqttExplorerSubsPaginationFragment$key | null) 
} & MqttExplorerSubsProps

function MqttExplorerSubsBody({dataRef}:MqttExplorerSubsBodyProps){

  const { id }: any = useParams<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState(id)

  const pagination = usePaginationFragment<
  MqttExplorerSubsPaginationFragmentRefetchQuery,
  MqttExplorerSubsPaginationFragment$key
  >(MqttExplorerSubsPaginationFragmentTag, dataRef);

  const conCtx = useMqttExplorerSubCtx();
  
  useEffect(() => {
    pagination.data?.mqttExplorerUserStoredSubs?.__id &&
      conCtx.setId(pagination.data?.mqttExplorerUserStoredSubs?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.data?.mqttExplorerUserStoredSubs?.__id])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
    
  const handleSubSelect = useCallback(
    (id: string | null | undefined) => {

    },
    []
  );

  return <InfinityScrollBody
    height="h-full"
    onEnd={handleLoadMore}
    >
      {
        pagination?.data?.mqttExplorerUserStoredSubs?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttExplorerSubItem 
            key={edge.node?.id??index}
            dataRef={edge.node}
            onItemClick={handleSubSelect}
          />
       })
    }
  </InfinityScrollBody>

}
