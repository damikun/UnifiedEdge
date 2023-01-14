import clsx from "clsx";
import { JsonViewer } from "@textea/json-viewer";
import { graphql } from "babel-plugin-relay/macro";
import { MESSAGE_PARAM_NAME } from "./MqttRecentMessages";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { GetLocalDate } from "../../../../../Shared/Common";
import { useParams, useSearchParams } from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttRecentMessageDetailQuery } from "./__generated__/MqttRecentMessageDetailQuery.graphql";
import { MqttRecentMessageDetailmessagePayloadFragment$key } from "./__generated__/MqttRecentMessageDetailmessagePayloadFragment.graphql";


const MqttRecentMessageDetailTag = graphql`
  query MqttRecentMessageDetailQuery($server_uid:ID!,$message_uid:ID!) {
    mqttServerMessageById(
        server_uid:$server_uid,
        message_uid: $message_uid) {
          id
          dup
          qos
          topic
          retain
          clientId
          timeStamp
          responseTopic
          expireInterval
          ...MqttRecentMessageDetailmessagePayloadFragment @defer 
      }
   }

`;


export default function MqttRecentMessageDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  const [message_id] = useState<string>(searchParams.get(MESSAGE_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttRecentMessageDetailQuery>(
    MqttRecentMessageDetailTag,
    {
      server_uid:server_id,
      message_uid:message_id
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttMessageDetailFetchKey"
    },
  );

  const timestamp = useMemo(()=>{
    return data?.mqttServerMessageById?.timeStamp?GetLocalDate(data?.mqttServerMessageById?.timeStamp) :"N/A";
  },[data]) 

  return <ModalContainer label="Message detail">
    <div className="flex flex-col space-y-2 w-full md:w-102 xl:w-160">

        <FieldGroup name="Sender">
          <FieldSection 
            multiline
            className="line-clamp-2 text-md font-semibold text-gray-700 capitalize"
            name="Client">
            {data.mqttServerMessageById?.clientId}
          </FieldSection>

          <FieldSection name="TimeStamp">
            {timestamp}
          </FieldSection>

          <FieldSection 
            className="font-mono line-clamp-3 select-all"
            multiline 
            name="Topic">
            {data.mqttServerMessageById?.topic}
          </FieldSection>

          {
            data.mqttServerMessageById?.responseTopic && <>
              <FieldSection 
                className="font-mono line-clamp-3 select-all" 
                multiline 
                name="Response Topic">
                {data.mqttServerMessageById?.topic}
              </FieldSection>
            </>
          }

        </FieldGroup>

        <FieldDivider/>

        <FieldGroup name="Flags">
          <FieldSection name="Qos">
            {data.mqttServerMessageById?.qos}
          </FieldSection>

          <FieldSection name="Retain">
            {data.mqttServerMessageById?.retain ? "Yes":"No"}
          </FieldSection>

          <FieldSection name="Dup">
            {data.mqttServerMessageById?.dup ? "Yes":"No"}
          </FieldSection>
        </FieldGroup>

        <FieldDivider/>

        <Suspense>
          <MessageSection dataRef={data.mqttServerMessageById}/>
        </Suspense>

    </div>
  </ModalContainer>
}

export const MqttRecentMessageDetailmessagePayloadFragmentTag = graphql`
  fragment MqttRecentMessageDetailmessagePayloadFragment on GQL_MqttMessage 
  {
    id
    payload
    contentType
    isXmlPayload
    isJsonPayload
    isTextPayload
    payloadUtf8Str
  }
`;

type MessageSectionProps = {
  dataRef:MqttRecentMessageDetailmessagePayloadFragment$key | null;
}

function MessageSection({dataRef}:MessageSectionProps){

  const data = useFragment(MqttRecentMessageDetailmessagePayloadFragmentTag, dataRef);
  
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if(!isShown){
    return null;
  }
  
  return <FieldGroup className="min-w-full" name="Message">
            
  <FieldSection name="ContentType">
    {data?.contentType ?? "Undefined"}
  </FieldSection>
  
  {
    data?.isJsonPayload && 
    data.payloadUtf8Str && <>
    <FieldSection variant="flex-col" name="Response body">
      <JsonSection rawData={data.payloadUtf8Str}/>
    </FieldSection>
  </>
  }

  {
  data?.isTextPayload && 
  data.payloadUtf8Str &&<>
    <FieldSection variant="flex-col" name="Response body">
      <TextSection rawData={data.payloadUtf8Str}/>
    </FieldSection>
  </>
  }

  {
  data?.isTextPayload === false && 
  data?.isJsonPayload === false && 
  data.payloadUtf8Str && <>
    <FieldSection variant="flex-col" name="Payload">
      <UniversalSection rawData={data.payloadUtf8Str}/>
    </FieldSection>
  </>
  }

</FieldGroup>
}

// -------------------------------

type RenderPayloadSectionProps = {
  rawData: string | null | undefined
};

function UniversalSection({ rawData }: RenderPayloadSectionProps) {

  const json_obj = useMemo(() => {
    if(rawData){
      try{
        return rawData ?
        JSON.parse(rawData) : 
        rawData
      }catch{
        return null;
      }
    }

    return null;

  }, [rawData])

  if (json_obj === null || json_obj ===undefined) {
    return <TextSection rawData={rawData}/>
  }else{
    return <JsonSection rawData={json_obj}/>
  }

}

// -------------------------------

type JsonSectionProps = {
  rawData: string | null | undefined | object;
};

function JsonSection({ rawData }: JsonSectionProps) {

  const json_obj = useMemo(() => {

    if(typeof rawData === 'object' && rawData !== null){
      return rawData;
    }

    if(rawData){
      try{
        return rawData ?
        JSON.parse(rawData) : 
        rawData
      }catch{
        return null;
      }
    }

    return null;

  }, [rawData])

  if (json_obj === null || json_obj ===undefined) {
    return <></>;
  }

  return (
    <FieldGroup className="w-full">
      <div className={clsx("rounded-lg p-3 bg-gray-50",
        "shadow-sm border border-gray-300 w-full")}>
        <div className={clsx("flex overflow-x-scroll overflow-y-auto",
        "text-xs h-full break-all flex-wrap max-w-full")}>
          <JsonViewer 
            collapseStringsAfterLength={1000}
            enableClipboard={true}
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

// ---------------------------

type TextSectionProps = {
  rawData: string | null | undefined;
};

function TextSection({ rawData }: TextSectionProps) {

  if (rawData === null || rawData ===undefined) {
    return <></>;
  }

  return (
    <div className={clsx("flex w-full h-full max-h-96 overflow-y-scroll",
      "overflow-x-hidden border border-gray-200 shadow-sm",
      "p-2 md:p-5 bg-gray-50 rounded-lg")}>
      <div className="break-all whitespace-pre-wrap font-mono select-text">
        {rawData}
      </div>
    </div>
  );
} 
