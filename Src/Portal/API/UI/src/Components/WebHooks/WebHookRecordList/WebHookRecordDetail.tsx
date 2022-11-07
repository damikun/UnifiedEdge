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
      isJsonResponse
      isTextHtmlResponse
      responseContentType
    }
  }
`;

export default function WebHookRecordDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <FieldSection name="Trigger">
          {data.webHookRecordById.hookEventGroup}
        </FieldSection>
        <FieldSection name="Timestamp">
          {dt}
        </FieldSection>
        <FieldSection name="Record Uid">
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
          data.webHookRecordById.requestBody && <>
            <FieldSection variant="flex-col" name="Request body">
              <JsonSection raw_json={data.webHookRecordById.requestBody}/>
            </FieldSection>
          </>
        }

        {
          data.webHookRecordById.responseBody && 
          (data.webHookRecordById.isJsonResponse || data.webHookRecordById.isTextHtmlResponse) && <>
            <FieldDivider/>
            <FieldSection className="font-mono" name="Response Type">
              {data.webHookRecordById.responseContentType}
            </FieldSection>
            {
              data.webHookRecordById.isJsonResponse && <>
                <FieldSection variant="flex-col" name="Response body">
                  <JsonSection raw_json={data.webHookRecordById.responseBody}/>
                </FieldSection>
              </>
            }
            {
              data.webHookRecordById.isTextHtmlResponse && <>
                <FieldSection variant="flex-col" name="Response body">
                  <HtmlSection raw_html={data.webHookRecordById.responseBody}/>
                </FieldSection>
              </>
            }
          </>
        }

      </FieldGroup>
   
      {data.webHookRecordById.exception && <>
          <FieldDivider/>
          <FieldSection
            name="Exception"
            variant="flex-col">
              <ExceptionSection exception={data.webHookRecordById.exception}/>
          </FieldSection>
        </>
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
      <div className={clsx("rounded-md p-3 bg-gray-100",
        "shadow-sm border border-gray-300 w-full")}>
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


// -------------------------------

type HtmlSectionProps = {
  raw_html: string | null | undefined;
};

function HtmlSection({ raw_html }: HtmlSectionProps) {

  if (raw_html === null || raw_html ===undefined) {
    return <></>;
  }


  return (
    <div className={clsx("flex w-full h-full max-h-96 overflow-y-scroll",
      "overflow-x-hidden border border-gray-200 shadow-sm",
      "p-2 md:p-5 bg-gray-900 text-white rounded-md")}>
      <div className="break-all whitespace-pre-wrap font-mono">
        {raw_html}
      </div>
    </div>
  );
} 

// ---------------------------------


type ExceptionSectionProps = {
  exception: string | null | undefined;
};

function ExceptionSection({ exception }: ExceptionSectionProps) {

  if (exception === null || exception ===undefined) {
    return <></>;
  }


  return (
    <div className={clsx("flex w-full h-full max-h-96 overflow-y-scroll",
      "overflow-x-hidden border border-gray-200 shadow-sm",
      "p-2 md:p-5 bg-gray-900 text-white rounded-md")}>
      <div className="break-all whitespace-pre-wrap font-mono">
        {exception}
      </div>
    </div>
  );
} 