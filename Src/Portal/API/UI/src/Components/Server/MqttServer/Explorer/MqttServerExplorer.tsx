import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import MqttExplorerSubs from "./MqttExplorerSubs";
import { graphql } from "babel-plugin-relay/macro";
import MqttExplorerMessages from "./MqttExplorerMessages";
import { MqttServerExplorerQuery } from "./__generated__/MqttServerExplorerQuery.graphql";



export const MqttServerExplorerQueryTag = graphql`
  query MqttServerExplorerQuery($id:ID!) 
  {
    ...MqttExplorerSubsPaginationFragment@arguments(server_uid: $id)
  }
`;

export default React.memo(MqttServerExplorer)

function MqttServerExplorer() {

  const { id }: any = useParams<string>();    

  const [server_id] = useState(id);
  
  const data = useLazyLoadQuery<MqttServerExplorerQuery>(
    MqttServerExplorerQueryTag,
    {id:server_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <div className="flex flex-col space-y-5 2xl:space-y-0 lg:flex-row">
      <div className="flex w-full lg:w-96 2xl:pr-5">
        <MqttExplorerSubs dataRef={data}/>
      </div>
      <div className="flex w-full 2xl:w-full">
        <MqttExplorerMessages />
      </div>
    </div>
  </>
}