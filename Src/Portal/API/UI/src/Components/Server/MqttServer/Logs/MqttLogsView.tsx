
import { useState } from "react";
import MqttLogs from "./MqttLogs";
import LogsInfo from "./LogsInfo";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import ServerLogs from "../../ServerLogs/ServerLogs";
import { MqttLogsViewQuery } from "./__generated__/MqttLogsViewQuery.graphql";


const MqttLogsViewTag = graphql`
  query MqttLogsViewQuery($id:ID!) {
    ...ServerLogsPaginationFragment_logs @arguments(id:$id)
    ...MqttLogsPaginationFragment_logs @arguments(id:$id) @defer
  }
`;

export default function MqttLogsView(){

    const { id }: any = useParams<string>();
  
    const [server_id] = useState<string>(id)

    const data = useLazyLoadQuery<MqttLogsViewQuery>(
      MqttLogsViewTag,
      {id:server_id},
      {
        fetchPolicy: "store-and-network",
        UNSTABLE_renderPolicy: "partial"
      },
    );
    
    return <>
      <div className="flex flex-col space-y-5 w-full">
        <LogsInfo/>
        <div className="flex w-full">
          <ServerLogs dataRef={data}/>
        </div>
        <div className="flex w-full">
          <MqttLogs dataRef={data}/>
        </div>
      </div>
    </>
}
