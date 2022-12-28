import clsx from "clsx";
import {useState } from "react";
import { useRecoilValue} from "recoil";
import { useParams } from "react-router";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import MqttExplorerMessage from "./MqttExplorerMessage";
import { useOnScreen } from "../../../../Hooks/useOnScreen";
import Section from "../../../../UIComponents/Section/Section";
import { mqttExplorerUniqueMessages } from "./MqttServerExplorer";
import MqttExplorerMessagesBarBar from "./MqttExplorerMessagesBar";
import useScrollDirection from "../../../../Hooks/useScrollDirection";


export default React.memo(MqttExplorerMessages)

function MqttExplorerMessages() {

  const { id }: any = useParams<string>();    

  const [server_id] = useState(id);

  const data = useRecoilValue(mqttExplorerUniqueMessages(server_id))

  const containerRef = useRef<HTMLDivElement | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);

  const [direction, handleScroll] = useScrollDirection(containerRef)

  const [intersecting,dispose] = useOnScreen(endRef,0.9);

  const [autoScroll,setAutoScroll] = useState(true);

  useEffect(() => {  
    return () => {
      dispose()
    }
  })

  useEffect(() => {
    if(direction === "up"){
      setAutoScroll(false)
    }

    if(direction === "down" && intersecting){
      setAutoScroll(true)
    }
  }, [direction,intersecting])
  
  
  return <>
    <Section 
      name={"Messages"}
      bar={<MqttExplorerMessagesBarBar/>}
      component={
        <div ref={containerRef} 
        onScroll={handleScroll}
        className={clsx("flex h-96 lg:h-auto max-h-fit flex-col w-full p-2",
        "border border-gray-200 rounded-md shadow-sm relative space-y-5",
        "overflow-y-scroll overflow-x-hidden bg-gray-50",
        "bg-explorer-background bg-contain")}>
          {/* <div className="w-full block space-y-2 overflow-hidden"> */}
            <AnimatePresence>
              {
                data.map((enity)=>{
                  return <MqttExplorerMessage 
                  key={enity.message.id}
                  data={enity} />
                })
              }
            </AnimatePresence>

            <div ref={endRef}>
              <ScrollToBottom autoScroll={autoScroll} />
            </div>

          </div>
        // </div>
      }
    />
  </>
}

type ScrollToBottomProps ={
  autoScroll:boolean
}

const ScrollToBottom = ({autoScroll}:ScrollToBottomProps) => {
  const elementRef =  useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    autoScroll && elementRef?.current?.scrollIntoView(
      { behavior: "smooth" }
    )
  });

  return <div ref={elementRef} />;
};
