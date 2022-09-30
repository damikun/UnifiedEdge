import clsx from "clsx";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { ServerLogsItem } from "./ServerLogsItem";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../UIComponents/Section/Section";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { ServerLogsQuery } from "./__generated__/ServerLogsQuery.graphql";
import { ServerLogsPaginationFragmentRefetchQuery } from "./__generated__/ServerLogsPaginationFragmentRefetchQuery.graphql";
import { ServerLogsPaginationFragment_logs$key } from "./__generated__/ServerLogsPaginationFragment_logs.graphql";
import StayledInfinityScrollContainer from "../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";


const ServerLogsTag = graphql`
  query ServerLogsQuery($id:ID!) {
    ...ServerLogsPaginationFragment_logs @arguments(id:$id)
  }
`;

const ServerLogsPaginationFragment = graphql`
  fragment ServerLogsPaginationFragment_logs on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    id: { type: "ID!" }
  )
  @refetchable(queryName: "ServerLogsPaginationFragmentRefetchQuery") {
    __id
    serverLogs(server_id:$id, first: $first, after: $after)
      @connection(key: "ServerLogsPaginationFragmentConnection_serverLogs") {
      __id
      edges {
        node {
          ... on GQL_IServerEvent{
            iD
            ...ServerLogsItemDataFragment
          }
        }
      }
    }
  }
`;

export default React.memo(ServerLogs)

function ServerLogs() {

  const { id }: any = useParams<string>();
  
  const data = useLazyLoadQuery<ServerLogsQuery>(
    ServerLogsTag,
    {id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  const pagination = usePaginationFragment<
  ServerLogsPaginationFragmentRefetchQuery,
  ServerLogsPaginationFragment_logs$key
  >(ServerLogsPaginationFragment, data);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  return <Section 
    name={"Logs"}
    component={
      <div className={clsx("flex bg-gray-100 flex-col w-full",
      "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
        <StayledInfinityScrollContainer
          header={<Header/>}
          onEnd={handleLoadMore}
        >
          {
            pagination?.data?.serverLogs?.edges?.map((edge,index)=>{
                return <ServerLogsItem 
                key={edge.node?.iD??index}
                dataRef={edge.node}
              />
            })
          }
        </StayledInfinityScrollContainer>
      </div>
    }
    />
}

function Header(){
  return <div className={clsx("flex text-gray-600 w-full",
  "space-x-2 justify-between border-b border-gray-200",
  "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none font-semibold")}>
  <div className="flex w-6/12 2xl:w-8/12">
    <div>Name</div>
  </div>
  <div className="w-1/12 2xl:w-2/12 text-center justify-center hidden md:flex">
    <div>Type</div>
  </div>
  <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
    <div>Timestamp</div>
  </div>
</div>
}