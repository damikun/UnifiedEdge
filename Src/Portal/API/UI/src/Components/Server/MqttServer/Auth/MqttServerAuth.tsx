import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import MqttAuthClients from "./ClientList/MqttAuthClients";
import { MqttServerAuthQuery } from "./__generated__/MqttServerAuthQuery.graphql";
import MqttAuthUsers from "./UserList/MqttAuthUsers";


export const MqttServerAuthQueryTag = graphql`
  query MqttServerAuthQuery($id:ID!) 
  {
    mqttServerById(id:$id){ 
      id
    }

    ...MqttAuthClientsPaginationFragment@arguments(server_uid: $id)
    ...MqttAuthUsersPaginationFragment@arguments(server_uid: $id)
  }
`;

export default React.memo(MqttServerAuth)

function MqttServerAuth() {

  const { id }: any = useParams<string>();

  const [server_id] = useState(id);
  
  const data = useLazyLoadQuery<MqttServerAuthQuery>(
    MqttServerAuthQueryTag,
    {id:server_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <div className="flex flex-col space-y-5 2xl:space-y-0 2xl:flex-row">
      <div className="flex w-full 2xl:w-1/2 2xl:pr-5">
        <MqttAuthClients dataRef={data}/>
      </div>
      <div className="flex w-full 2xl:w-1/2">
        <MqttAuthUsers dataRef={data}/>
      </div>
    </div>
  </>
}