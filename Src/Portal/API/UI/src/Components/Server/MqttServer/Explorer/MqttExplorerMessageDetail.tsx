import clsx from "clsx";
import { useMemo } from "react";
import { GetLocalDate } from "../../../../Shared/Common";
import { MqttMessagePayload, MqttMessageType } from "./MqttServerExplorer";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";


type MqttExplorerMessageDetailProps = {
  data: MqttMessagePayload,
}

export default function MqttExplorerMessageDetail({
  data
}:MqttExplorerMessageDetailProps){

  const timestamp = useMemo(()=> {
    return GetLocalDate(data?.message?.timeStamp);
  },[data]) 

  return <>
    <div className="flex flex-col space-y-2 w-full md:w-102 xl:w-160">

        <FieldGroup name="Sender">
          <FieldSection 
            multiline
            className={clsx("line-clamp-2 text-md font-semibold",
            "text-gray-700 capitalize")}
            name="Client">
            {data?.message?.clientId}
          </FieldSection>

          <FieldSection name="TimeStamp">
            {timestamp}
          </FieldSection>

          <FieldSection 
            className="font-mono line-clamp-3 select-all"
            multiline 
            name="Topic">
            {data?.message?.topic}
          </FieldSection>

        </FieldGroup>

        <FieldDivider/>

        <FieldGroup name="Flags">
          <FieldSection name="Qos">
            {data?.message?.qos}
          </FieldSection>

          <FieldSection name="Retain">
            {data?.message?.retain ? "Yes":"No"}
          </FieldSection>

          <FieldSection name="Dup">
            {data?.message?.dup ? "Yes":"No"}
          </FieldSection>
        </FieldGroup>

        <FieldDivider/>

        {
          data?.message && <MessageSection message={data?.message}/>
        }
        
    </div>
  </>
}


type MessageSectionProps = {
  message:MqttMessageType
}

function MessageSection({message}:MessageSectionProps){
  const beautifyed = useMemo(() => {
    try{
      return message?.payloadUtf8Str
    }catch{
      return "Invalid Json format"
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  
  return <FieldSection variant="flex-col" name="Payload">
    <pre
      className={clsx("text-gray-800 resize-none whitespace-pre-wrap",
      "flex p-2 m-1 focus:outline-none font-mono w-full h-full text-sm",
      "flex-nowrap border bg-white rounded-lg items-center select-text")}>
      {beautifyed}
    </pre>
  </FieldSection>
}