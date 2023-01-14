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
import { JsonViewer } from "@textea/json-viewer";


const MqttAuthLogDetailQueryTag = graphql`
  query MqttAuthLogDetailQuery($log_id:ID!) {
    mqttAuthLogById(log_id: $log_id) {
      authClientId
      authUserId
      code
      jsonMetadata
      description
      errorMessage
      isSuccess
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

  const log_json = useMemo(() => 
  data.mqttAuthLogById.jsonMetadata ?
  JSON.parse(data.mqttAuthLogById.jsonMetadata) : 
  data.mqttAuthLogById.jsonMetadata, [data]
)

  return <ModalContainer label="Log detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      <FieldGroup>
        <FieldSection name="Result">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthLogById.code}
          </div>
        </FieldSection>
        <FieldSection name="Description">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthLogById.description}
          </div>
        </FieldSection>
        {data?.mqttAuthLogById.errorMessage && !data.mqttAuthLogById.isSuccess && <> 
          <FieldSection multiline name="Error Message">
            <div className={clsx("font-sans text-gray-700 font-semibold",
            "text-sm max-w-full break-all select-all capitalize")}>
              {data?.mqttAuthLogById.errorMessage}
            </div>
          </FieldSection>
        </>}
        <FieldSection name="TimeStamp">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize items-center")}>
            {dt}
          </div>
        </FieldSection>
      </FieldGroup>

      <FieldDivider/>

      <FieldGroup>
        <div className="rounded-lg p-3 bg-gray-50 shadow-sm border border-gray-300">
          <div className="flex overflow-hidden overflow-y-auto text-xs h-full break-all flex-wrap max-w-full">
            <JsonViewer 
              collapseStringsAfterLength={1000}
              enableClipboard={false}
              rootName={false}
              displayDataTypes={false}
              value={log_json}
            />
          </div>
        </div>
      </FieldGroup>
    </div>
  </ModalContainer>
}