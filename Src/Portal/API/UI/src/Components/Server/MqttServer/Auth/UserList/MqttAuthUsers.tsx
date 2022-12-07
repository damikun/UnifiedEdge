import MqttUserDetail from "./MqttAuthUserDetail";
import MqttAuthUsersBar from "./MqttAuthUsersBar";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { MqttAuthUserItem } from "./MqttAuthUserItem";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import Section from "../../../../../UIComponents/Section/Section";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttAuthUsersCtxProvider, useMqttAuthUsersCtx } from "./MqttAuthCUsersCtxProvider";
import { MqttAuthUsersBarEnableFragment$key } from "./__generated__/MqttAuthUsersBarEnableFragment.graphql";
import { MqttAuthUsersPaginationFragment$key } from "./__generated__/MqttAuthUsersPaginationFragment.graphql";
import { MqttAuthUsersPaginationFragmentRefetchQuery } from "./__generated__/MqttAuthUsersPaginationFragmentRefetchQuery.graphql";


export const MqttAuthUsersPaginationFragment = graphql`
  fragment MqttAuthUsersPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttAuthUsersPaginationFragmentRefetchQuery") {
    __id
    mqttAuthUsers(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttAuthUsersPaginationFragmentConnection_mqttAuthUsers") {
      __id
      edges {
        node {
          id
          userName
          ...MqttAuthUserItemDataFragment
        }
      }
    }
  }
`;

export const USER_PARAM_NAME = "user_id"

export default React.memo(MqttAuthUsers)

type MqttAuthUsersProps = {
  dataRef: (MqttAuthUsersPaginationFragment$key | null) &
  (MqttAuthUsersBarEnableFragment$key | null);
}

function MqttAuthUsers({dataRef}:MqttAuthUsersProps) {
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(USER_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(USER_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  
  return <MqttAuthUsersCtxProvider>
  <Modal
    position="top"
    isOpen={isOpen}
    onClose={handleModalClose}
    component={
      <MqttUserDetail />
    }
  />
      <Section 
          name={"AuthUsers"}
          bar={<MqttAuthUsersBar dataRef={dataRef}/>}
          component={
            <InfinityScrollTable
              height="h-96"
              header={<Header/>}
            >
              <UserListBody dataRef={dataRef}/>
            </InfinityScrollTable>
          }
      />
  </MqttAuthUsersCtxProvider>
}

type UserListBodyProps = {

}&MqttAuthUsersProps

function UserListBody({dataRef}:UserListBodyProps){

  const { id }: any = useParams<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState(id)

  const pagination = usePaginationFragment<
  MqttAuthUsersPaginationFragmentRefetchQuery,
  MqttAuthUsersPaginationFragment$key
  >(MqttAuthUsersPaginationFragment, dataRef);

  const conCtx = useMqttAuthUsersCtx();
  
  useEffect(() => {
    pagination.data?.mqttAuthUsers?.__id &&
      conCtx.setId(pagination.data?.mqttAuthUsers?.__id)
  }, [pagination.data?.mqttAuthUsers?.__id])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemDetail = useCallback(
    (User_id: string | null | undefined) => {
      searchParams.delete(USER_PARAM_NAME);
      if (User_id) {
        searchParams.append(USER_PARAM_NAME, User_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <InfinityScrollBody
    height="h-72"
    onEnd={handleLoadMore}
    >
      {
        pagination?.data?.mqttAuthUsers?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttAuthUserItem 
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
    <tr className="flex w-6/12 2xl:w-8/12">
      <th>UserName</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <th>Enabled</th>
    </tr>
  </TableHeader>
}