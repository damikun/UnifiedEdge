import clsx from "clsx";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { mqttExplorerData } from "./MqttServerExplorer";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { useMqttExplorerSubCtx } from "./MqttExplorerSubCtx";
import TableItem from "../../../../UIComponents/Table/TableItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useMemo, useState, useTransition } from "react";
import { useFragment, useMutation, useSubscription } from "react-relay";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { MqttExplorerSubItemDataFragment$key } from "./__generated__/MqttExplorerSubItemDataFragment.graphql";
import { MqttExplorerSubItemRemoveMutation } from "./__generated__/MqttExplorerSubItemRemoveMutation.graphql";
import { MqttExplorerSubItemTopicSubscription } from "./__generated__/MqttExplorerSubItemTopicSubscription.graphql";



const MqttExplorerSubItemDataFragment = graphql`
  fragment MqttExplorerSubItemDataFragment on GQL_MqttExplorerSub {
    id
    topic
    color
    serverUid
  }
`;

export const MqttExplorerSubItemRemoveMutationTag = graphql`
  mutation MqttExplorerSubItemRemoveMutation(
    $input: RemoveMqttServerExplorerUserSubInput!
    $connections: [ID!]!
    ) {
      removeMqttServerExplorerUserSub(input: $input) {
      ... on RemoveMqttServerExplorerUserSubPayload {
        gQL_MqttExplorerSub{
          id @deleteEdge(connections: $connections)
        }
        errors{
          __typename

          ... on ValidationError{
            errors{
              property
              message
            }
          }

          ... on ResultError{
            message
          }
        }
      }
    }
}
`


const TopicSub = graphql`
    subscription MqttExplorerSubItemTopicSubscription(
      $id:ID!
      $topic:String!
    ) {
        mqttBridgeSubscribe(server_id: $id, topic: $topic) {
          id
          contentType
          topic
          isJsonPayload
          isTextPayload
          isXmlPayload
          payload
          timeStamp
          payloadUtf8Str
          qos
          retain
          clientId
          dup
        }
    }
`;


type MqttExplorerSubItemProps = {
  dataRef: MqttExplorerSubItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
}

export function MqttExplorerSubItem({dataRef, onItemClick}:MqttExplorerSubItemProps){

  const data = useFragment(MqttExplorerSubItemDataFragment, dataRef);
  
  const { id }: any = useParams<string>();    

  const [server_id] = useState(id);
  
  const addMessages = useSetRecoilState(mqttExplorerData(server_id));

  const sub_cfg = useMemo(() => ({
    variables: {
      id:data?.serverUid,
      topic:data?.topic
    },
    subscription:TopicSub,
    updater: (store,enity) => { 
      
      if(enity?.mqttBridgeSubscribe?.id){
        addMessages([{
          type:"in",
          message:enity?.mqttBridgeSubscribe
        }])
      }

    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttExplorerSubItemTopicSubscription>), [data,addMessages]);

  useSubscription<MqttExplorerSubItemTopicSubscription>(sub_cfg);

  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const ctx = useMqttExplorerSubCtx();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick(data.id)
      });
    },
    [onItemClick,data],
  )

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttExplorerSubItemRemoveMutation>(
    MqttExplorerSubItemRemoveMutationTag
  );

  const toast = useToast();

  const handleRemove = useCallback(
    () => {

      return !isInFlight  && commit({
        variables: {
          input: {
            storedsub_id:data?.id ?? ""
          },
          connections: ctx.connection_id?[ctx.connection_id]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeMqttServerExplorerUserSub?.gQL_MqttExplorerSub){
            // ...
          }
          HandleErrors(toast, response?.removeMqttServerExplorerUserSub?.errors);
        },

        optimisticUpdater(store){
          // if(data?.id){
          //   store.delete(data?.id)
          // }
        }

      });
    },
    [isInFlight,data?.id,commit,toast,ctx.connection_id]
  );


  return <TableItem
    onClick={handleClick}
    className="group"
    // style={{backgroundColor:`${data?.color}0D`??"#FFFFFF"}}
    key={data?.id}>
    <td className="flex items-center justify-between w-full">
      <div className="flex w-full flex-row space-x-3 h-8 items-center">
        <div style={{backgroundColor:data?.color??"#FFFFFF"}}
         className="w-1 flex h-full bg-opacity-40 rounded-lg bg-black whitespace-pre-line"/>
        <div className={clsx("flex w-full line-clamp-1 font-sans text-gray-700",
        "font-semibold text-sm capitalize break-all pr-2 overflow-hidden text-start")}>
          {data?.topic}
        </div>
      </div>
    </td>

    <td className="w-6">
      <div onClick={handleRemove} 
        className={clsx(" w-5 h-5 rounded-full",
        "items-center justify-center bg-gray-400 leading-none",
        "shadow-md hover:scale-105 flex transition duration-300",
        "hover:bg-red-500 p-0.5")}>
        <FontAwesomeIcon 
          spin={isInFlight}
          className="text-white flex m-auto" 
          icon={isInFlight? faSpinner : faTimes} />
      </div>
    </td>
  </TableItem>
}
