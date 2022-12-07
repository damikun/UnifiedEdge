import { useParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { useCallback, useMemo, useState } from "react";
import { MqttAuthUsersPaginationFragment } from "../UserList/MqttAuthUsers";
import { MqttAuthClientsPaginationFragment } from "../ClientList/MqttAuthClients";
import { defaultClinet, defaultUser, useMqttAuthLogsCtx } from "./MqttAuthLogsCtxProvider";
import SelectList, { SelectItemType } from "../../../../../UIComponents/SelectList/SelectList"; 
import { MqttAuthUsersPaginationFragment$key } from "../UserList/__generated__/MqttAuthUsersPaginationFragment.graphql";
import { MqttAuthClientsPaginationFragment$key } from "../ClientList/__generated__/MqttAuthClientsPaginationFragment.graphql";
import { MqttAuthUsersPaginationFragmentRefetchQuery } from "../UserList/__generated__/MqttAuthUsersPaginationFragmentRefetchQuery.graphql";
import { MqttAuthClientsPaginationFragmentRefetchQuery } from "../ClientList/__generated__/MqttAuthClientsPaginationFragmentRefetchQuery.graphql";


type MqttAuthLogsBarProps = {
  dataRef: (MqttAuthClientsPaginationFragment$key | null) & 
  (MqttAuthUsersPaginationFragment$key | null) 
}

export default function MqttAuthLogsBar({dataRef}:MqttAuthLogsBarProps){

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const ctx = useMqttAuthLogsCtx();
  
  const client_pagination = usePaginationFragment<
  MqttAuthClientsPaginationFragmentRefetchQuery,
  MqttAuthClientsPaginationFragment$key
  >(MqttAuthClientsPaginationFragment, dataRef);

  const user_pagination = usePaginationFragment<
  MqttAuthUsersPaginationFragmentRefetchQuery,
  MqttAuthUsersPaginationFragment$key
  >(MqttAuthUsersPaginationFragment, dataRef);

  const memorised_client_options = useMemo(() => {

    return client_pagination.data?.mqttAuthClients?.edges?.filter(
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


  const memorised_user_options = useMemo(() => {

    return user_pagination.data?.mqttAuthUsers?.edges?.filter(
      e=>e.node?.id !==null && 
      e.node?.id !== undefined && 
      e.node.userName !==null
    )
    .map((enity,index)=>{
      return {
        id:enity?.node?.id as string,
        data: enity.node?.userName as string,
        displayName: enity.node?.userName as string
      }
    }) ?? []

  }, [user_pagination.data])


  const handleClientFilterChange = useCallback(
    (data:SelectItemType<string>) => ctx.setClientFilter(data),
    [ctx],
  )
 
  const handleUserFilterChange = useCallback(
    (data:SelectItemType<string>) => ctx.setUserFilter(data),
    [ctx],
  )

  return <div className="flex flex-row flex-none space-x-3">
    <SelectList
      onChange={handleClientFilterChange}
      options={memorised_client_options}
      value={ctx.client_filter}
      defaultValue={defaultClinet}
      disabled={false} 
    />
    <SelectList
      onChange={handleUserFilterChange}
      options={memorised_user_options}
      value={ctx.user_filter}
      defaultValue={defaultUser}
      disabled={false} 
    />
</div> 
}