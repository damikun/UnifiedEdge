import MqttLogsBar from "./MqttLogsBar";
import MqttLogDetail from "./MqttlogDetail";
import { MqttLogsItem } from "./MqttLogsItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Modal from "../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo, useState } from "react";
import Section from "../../../../UIComponents/Section/Section";
import TableHeader from "../../../../UIComponents/Table/TableHeader";
import InfinityScrollBody from "../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import { MqttLogsPaginationFragment_logs$key } from "./__generated__/MqttLogsPaginationFragment_logs.graphql";
import { MqttLogsPaginationFragmentRefetchQuery } from "./__generated__/MqttLogsPaginationFragmentRefetchQuery.graphql";


const MqttLogsPaginationFragment = graphql`
  fragment MqttLogsPaginationFragment_logs on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    id: { type: "ID!" }
  )
  @refetchable(queryName: "MqttLogsPaginationFragmentRefetchQuery") {
    __id
    mqttLogs(server_uid:$id, first: $first, after: $after)
      @connection(key: "MqttLogsPaginationFragmentConnection_mqttLogs") {
      __id
      edges {
        node {
          uid
          ...MqttLogsItemDataFragment
        }
      }
    }
    ...MqttLogsBarEnableFragment@arguments(server_id:$id)
  }
`;

export const I_LOG_PARAM_NAME = "i_log_id"

export default React.memo(MqttLogs)

type MqttLogsProps = {
  dataRef:MqttLogsPaginationFragment_logs$key | null;
}

function MqttLogs({dataRef}:MqttLogsProps) {

  const { id }: any = useParams<string>();
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState<string>(id)

  const pagination = usePaginationFragment<
  MqttLogsPaginationFragmentRefetchQuery,
  MqttLogsPaginationFragment_logs$key
  >(MqttLogsPaginationFragment, dataRef);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(I_LOG_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(I_LOG_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {
      searchParams.delete(I_LOG_PARAM_NAME);
      if (log_id) {
        searchParams.append(I_LOG_PARAM_NAME, log_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <MqttLogDetail />
      }
    />
    <Section 
      name={"Instance logs"}
      bar={<MqttLogsBar dataRef={pagination.data}/>}
      component={
        <InfinityScrollTable
          header={<Header/>}
        >
          <InfinityScrollBody onEnd={handleLoadMore}>
            {
              pagination?.data?.mqttLogs?.edges?.map((edge,index)=>{
                  return <MqttLogsItem 
                  key={edge.node?.uid??index}
                  dataRef={edge.node}
                  onItemClick={handleItemDetail}
                />
              })
            }
          </InfinityScrollBody>
        </InfinityScrollTable>
      }
      />
    </>
}

function Header(){
  return <TableHeader>
  <tr className="flex w-6/12 2xl:w-8/12">
    <th>Message</th>
  </tr>
  <tr className="w-1/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
    <th>Type</th>
  </tr>
  <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
    <th>Timestamp</th>
  </tr>
</TableHeader>
}