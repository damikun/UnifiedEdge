import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { Log_PARAM_NAME } from "./MqttAuthLogs";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { GetLocalDate } from "../../../../../Shared/Common";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { MqttAuthLogDetailQuery } from "./__generated__/MqttAuthLogDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";


const MqttAuthLogDetailQueryTag = graphql`
  query MqttAuthLogDetailQuery($log_id:ID!) {
    mqttAuthLogById(log_id: $log_id) {
      authClientId
      authUserId
      code
      endpoint
      errorMessage
      id
      timeStamp
    }
  }
`;


export default function MqttAuthLogDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [Log_id] = useState(searchParams.get(Log_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttAuthLogDetailQuery>(
    MqttAuthLogDetailQueryTag,
    {
      log_id:Log_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttAuthLogDetailFetchKey"
    },
  );
  
  const dt = useMemo(()=>{
    return GetLocalDate(data?.mqttAuthLogById.timeStamp);
  },[data]) 

  return <ModalContainer label="Log detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      <FieldGroup>
        <FieldSection name="Result">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthLogById.code}
          </div>
        </FieldSection>
        <FieldSection name="Endpoint">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthLogById.endpoint}
          </div>
        </FieldSection>
        <FieldSection multiline name="Message">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthLogById.errorMessage}
          </div>
        </FieldSection>
        <FieldSection name="Last trigger">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize items-center")}>
            {dt}
          </div>
        </FieldSection>
      </FieldGroup>
      <FieldDivider/>
    </div>
  </ModalContainer>
}