import clsx from "clsx";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import MqttExplorerSubs from "./MqttExplorerSubs";
import { graphql } from "babel-plugin-relay/macro";
import { atomFamily, selectorFamily } from "recoil";
import MqttExplorerMessages from "./MqttExplorerMessages";
import { LinkedList } from "../../../../Shared/LinkedList";
import { MqttServerExplorerQuery } from "./__generated__/MqttServerExplorerQuery.graphql";


export const MqttServerExplorerQueryTag = graphql`
  query MqttServerExplorerQuery($id:ID!) 
  {
    ...MqttExplorerSubsPaginationFragment @arguments(server_uid: $id)
  }
`;

function CreateDefaultStore(){
  return {
    data: new LinkedList<MqttMessagePayload>()
  } 
}

export type MqttMessagePayload = {
  type:"in"|"out"
  message:MqttMessageType
}

export type MqttMessageType = {
  clientId: string | null;
  contentType: string | null;
  dup: boolean;
  isJsonPayload: boolean;
  isTextPayload: boolean;
  isXmlPayload: boolean;
  payload: ReadonlyArray<any> | null;
  payloadUtf8Str: string | null;
  qos: any;
  retain: boolean;
  timeStamp: string;
  topic: string;
  id: string;
}

export const mqttExplorerStore = atomFamily({
  key: 'mqttExplorerStore',
  default: param => CreateDefaultStore(),
  dangerouslyAllowMutability: true,
});

const MESSAGES_MAX = 50;

export const mqttExplorerData = selectorFamily({
  key: 'mqttExplorerStoreData',
  get: (server_id)=>({get}) => get(mqttExplorerStore(server_id))
    .data.traverse(),
  set: (server_id)=>({get,set},messages) => {
    const store = get(mqttExplorerStore(server_id));
    
    (messages as MqttMessagePayload[]).forEach(element => {
      if(store.data.size()>MESSAGES_MAX){
        store.data.deleteFirst()
      }
      store.data.insertAtEnd(element)
    });

    set(mqttExplorerStore(server_id),{
      data:store.data
    })
  }
});


export const mqttExplorerUniqueMessages = selectorFamily({
  key: 'mqttExplorerUniqueMessages',
  get: (server_id)=>({get}) => {
    var messages = get(mqttExplorerData(server_id));

    var resArr:MqttMessagePayload[] = [];
    messages.forEach(function(item){
      var i = resArr.findIndex(x => x.message.id === item.message.id);
      if(i <= -1){
        resArr.push(item);
      }
    });
    return resArr?.map(obj => { return { ...obj, date: new Date(obj.message.timeStamp).getTime() } })
    .sort((a, b) => a.date - b.date )
  }
});


export default React.memo(MqttServerExplorer)

function MqttServerExplorer() {

  const { id }: any = useParams<string>();    

  const [server_id] = useState(id);
  
  const data = useLazyLoadQuery<MqttServerExplorerQuery>(
    MqttServerExplorerQueryTag,
    {id:server_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <div className={clsx("flex h-auto lg:max-h-fit lg:overflow-hidden",
    "lg:h-full flex-col space-y-5 lg:space-y-0 lg:flex-row max-w-full")}>
      <div className="flex h-full w-full lg:w-96 lg:pr-5">
        <MqttExplorerSubs dataRef={data}/>
      </div>
      <div className="flex h-full w-full lg:w-full">
        <MqttExplorerMessages />
      </div>
    </div>
  </>
}