import clsx from "clsx";
import { useMemo } from "react";
import { useLazyLoadQuery } from "react-relay";
import { JsonViewer } from "@textea/json-viewer";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { RECORD_PARAM_NAME } from "./WebHookRecordList";
import { StatusCodeSection } from "./WebHookRecordItem";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { WebHookRecordDetailQuery } from "./__generated__/WebHookRecordDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../Shared/Field/FieldHelpers";


const WebHookRecordDetailTag = graphql`
  query WebHookRecordDetailQuery($record_id:ID!) {
    webHookRecordById(record_id: $record_id){
      id
      statusCode
      timestamp
      hookEventGroup
      guid
      result
      exception
      requestHeaders
      requestBody
      responseBody
    }
  }
`;

export default function WebHookRecordDetail(){

  const [searchParams, setSearchParams] = useSearchParams();

  var record_id = searchParams.get(RECORD_PARAM_NAME);

  const data = useLazyLoadQuery<WebHookRecordDetailQuery>(
    WebHookRecordDetailTag,
    {record_id:record_id??""},
    {
      fetchPolicy: "store-and-network",
      fetchKey:"webhookRecordDetailFetchKey"
    },
  );

  const modalCtx = useModalContext();

  const dt = useMemo(()=>{
    return GetLocalDate(data?.webHookRecordById.timestamp);
  },[data]) 

  return <ModalContainer label="Record detail">
    <div className="flex flex-col space-y-2 max-w-xl">

      <FieldGroup>
        <FieldSection className="items-center" name="Status">
          <StatusCodeSection status={data?.webHookRecordById.statusCode} />
        </FieldSection>
        <FieldSection name="Trigger">{data.webHookRecordById.hookEventGroup}</FieldSection>
        <FieldSection name="Timestamp">{dt}</FieldSection>
        <FieldSection name="Hook Guid">
          <div className="font-mono select-text">
            {data.webHookRecordById.guid}
          </div>
        </FieldSection>
      </FieldGroup>

      <FieldDivider/>

      <FieldGroup>
        <FieldSection variant="flex-col" name="Request headers">
          <JsonSection raw_json={data.webHookRecordById.requestHeaders}/>
        </FieldSection>
        {
          data.webHookRecordById.requestBody && <FieldSection variant="flex-col" name="Request body">
            <JsonSection raw_json={data.webHookRecordById.requestBody}/>
          </FieldSection>
        }
        {/* {
          data.webHookRecordById.responseBody && <FieldSection variant="flex-col" name="Response body">
            <JsonSection raw_json={data.webHookRecordById.responseBody}/>
          </FieldSection>
        } */}

      </FieldGroup>
   
      {data.webHookRecordById.exception && (
        <FieldGroup>
          <FieldDivider/>
          <FieldSection
            className={clsx("border p-2 lg:p-5 bg-gray-800 text-sm",
            "text-white text font-mono rounded")}
            variant="flex-col"
            multiline
            name="Exception">
              {data?.webHookRecordById.exception}
          </FieldSection>
        </FieldGroup>
        )
      }
    </div>
  </ModalContainer>
}

// -------------------------------

type ModalContainerProps = {
  children: React.ReactNode;
  label?:string
}

function ModalContainer({children,label}:ModalContainerProps){
  return <div className={clsx("flex flex-col w-full h-full",
    "bg-gray-50 z-50 rounded-md shadow-sm overflow-hidden")}>
    <ModalHeader label={label}/>
    <div className="p-5 xl:p-7">
      {children}
    </div>
  </div>
}

type ModalHeaderProps = {
  label?:string
}

function ModalHeader({label}:ModalHeaderProps){
  return <div className={clsx("w-full bg-gray-200 overflow-hidden",
  "px-5 py-2 font-bold text-gray-500 shadow-sm")}>
    {label}
  </div>
}

// -------------------------------

type JsonSectionProps = {
  raw_json: string | null | undefined;
};

function JsonSection({ raw_json }: JsonSectionProps) {

  const json_obj = useMemo(() => 
    raw_json ?
    JSON.parse(raw_json) : 
    raw_json, [raw_json]
  )

  if (raw_json === null || raw_json ===undefined) {
    return <></>;
  }

  return (
    <FieldGroup className="w-full">
      <div className="rounded-md p-3 bg-gray-100 shadow-sm border border-gray-300 w-full">
        <div className={clsx("flex overflow-hidden overflow-y-auto",
        "text-xs h-full break-all flex-wrap max-w-full")}>
          <JsonViewer 
            collapseStringsAfterLength={1000}
            enableClipboard={false}
            rootName={false}
            quotesOnKeys={false}
            displayDataTypes={false}
            value={json_obj}
          />
        </div>
      </div>
    </FieldGroup>
  );
}
