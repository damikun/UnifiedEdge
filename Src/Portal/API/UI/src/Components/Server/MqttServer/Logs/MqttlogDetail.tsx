import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { I_LOG_PARAM_NAME } from "./MqttLogs";
import { MqttLogTypeBadget } from "./MqttLogType";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import { MqttlogDetailQuery } from "./__generated__/MqttlogDetailQuery.graphql";
import { usePresistedSearchParam } from "../../../../Hooks/usePresistedSearchParam";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";


const MqttLogDetailTag = graphql`
  query MqttlogDetailQuery($server_id:ID!, $log_uid:ID!) {
    mqttLogById(log_uid: $log_uid,server_id: $server_id){
      uid
      source
      message
      logLevel
      timeStamp
      exception
    }
  }
`;

export default function MqttLogDetail(){

  const { id }: any = useParams<string>();
  
  const [server_id] = useState<string>(id)

  const log_id = usePresistedSearchParam(I_LOG_PARAM_NAME)

  const data = useLazyLoadQuery<MqttlogDetailQuery>(
    MqttLogDetailTag,
    {
      log_uid:log_id??"",
      server_id:server_id
    },
    {
      fetchPolicy: "store-and-network",
    },
  );

  const dt = GetLocalDate(data?.mqttLogById.timeStamp);

  return <ModalContainer label="Event detail">
    <div className="flex flex-col space-y-2 w-full max-w-2xl">

      <FieldGroup>
        <FieldSection name="Level">
          <MqttLogTypeBadget state={data.mqttLogById.logLevel}/>
        </FieldSection>
        <FieldSection name="Timestamp">{dt}</FieldSection>
      </FieldGroup>

      <FieldDivider/>
      
      <FieldGroup>
        <FieldSection multiline name="Message">
          {data.mqttLogById.message}
        </FieldSection>
        <FieldSection multiline name="Source">
          {data.mqttLogById.source}
        </FieldSection>

        { data?.mqttLogById.exception && <>
          <FieldSection
            className={clsx("border p-2 lg:p-5 bg-gray-800 text-sm",
            "text-white text font-mono",
            "rounded")}
            variant="flex-col"
            multiline
            name="Exception">
            {data?.mqttLogById.exception}
          </FieldSection>
        </>
        }
      </FieldGroup>

      </div>
    </ModalContainer>
}
