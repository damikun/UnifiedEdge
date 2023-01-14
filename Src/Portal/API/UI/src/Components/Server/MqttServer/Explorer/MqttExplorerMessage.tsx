import clsx from "clsx";
import { useCallback } from "react";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {MqttMessagePayload } from "./MqttServerExplorer";
import { GetLocalDate } from "../../../../Shared/Common";


export default React.memo(MqttExplorerMessage)

type MqttExplorerMessageProps = {
  data: MqttMessagePayload,
  onClick?: (message:MqttMessagePayload)=>void
}

function MqttExplorerMessage({data,onClick}:MqttExplorerMessageProps) {

  const topic = useMemo(() => {
    if(data?.message?.topic){
      return data.message.topic.toLocaleLowerCase()
    }
    return "unknown";
  }, [data.message.topic])

  const handleOnClick = useCallback(
    () => {
      onClick && onClick(data)
    },
    [onClick],
  )

  return <MessageContainer 
    onClick={handleOnClick}
    type={data.type}
    timeStamp={data.message.timeStamp}>
    <div className="flex flex-row space-x-2 pb-2 text-sm flex-nowrap items-center">
      <div className="flex w-auto break-keep flex-nowrap font-bold">
        Topic:
      </div>
      <div className="flex w-full font-semibold line-clamp-2">
        {topic}
      </div>
    </div>

    {
      data.message.payloadUtf8Str && <>
        <div className="flex h-austo break-all items-center w-full h-full">
          <PayloadSection data={data}/>
        </div>
      </>
    }

  </MessageContainer>
}

//-------------------------------------------------

type MessageContainerProps = {
  type: "in" | "out"
  children:React.ReactNode
  onClick?: ()=>void
  className?:string
  timeStamp?:string
 }
 
 function MessageContainer({
   onClick,
   type,
   children,
   className,
   timeStamp
 }:MessageContainerProps){
 
  const onClickHandler = useCallback(
    () => {
      onClick && onClick()
    },
    [onClick],
  )
  
  const timestamp = useMemo(() => 
    GetLocalDate(timeStamp), [timeStamp]
  )  

   return <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    // exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className={clsx("flex max-w-8/12 flex-col relative w-auto",
    className,
    type === "in" && "self-start",
    type === "out" && "self-end")}>

    <div onClick={onClickHandler} 
      className={clsx("flex flex-col bg-opacity-70 break-all cursor-pointer",
      "rounded-lg min-h-32 max-h-fit backdrop-blur-sm shadow-sm",
      "overflow-x-hidden py-2 px-3 border-gray-200 border",
      "hover:ring-2 ring-gray-500 transition duration-200",
      type === "in" && "bg-gray-200 text-gray-700",
      type === "out" && "bg-blue-500 text-white")}>
        {children}
    </div>

    <div className={clsx("text-gray-500 text-sm w-full",
    type === "in" && "text-start",
    type === "out" && "text-end")}>
      {timestamp}
    </div>
    
  </motion.div>
 }

 //-------------------------------------------------

 type PayloadSectionProps = {
  data: MqttMessagePayload
};
 
function PayloadSection({ data }: PayloadSectionProps) {

  const beautifyed = useMemo(() => {
    try{
      return data?.message?.payloadUtf8Str
    }catch{
      return "Invalid Json format"
    }
  }, [])

  
  return <pre
  className={clsx("text-gray-800 resize-none whitespace-pre-wrap",
  "flex p-2 m-1 focus:outline-none font-mono w-full h-full text-sm",
  "flex-nowrap border bg-white rounded-lg items-center")}
  >
    {beautifyed}
  </pre>
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function syntaxHighlight(json:string) {
  if (typeof json != 'string') {
       json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  });
}