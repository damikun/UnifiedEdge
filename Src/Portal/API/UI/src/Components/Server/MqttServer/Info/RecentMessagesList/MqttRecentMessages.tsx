import { graphql } from "babel-plugin-relay/macro";
import MqttRecentMessagesBar from "./MqttRecentMessagesBar";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import { LinkedList } from "../../../../../Shared/LinkedList";
import MqttRecentMessageDetail from "./MqttRecentMessageDetail"
import Section from "../../../../../UIComponents/Section/Section";
import { MqttRecentMessagesItem } from "./MqttRecentMessagesItem";
import { usePaginationFragment, useSubscription } from "react-relay";
import useDidMountEffect from "../../../../../Hooks/useDidMountEffect";
import useRenderDebounce from "../../../../../Hooks/useRenderDebounce";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import { FragmentRefs, GraphQLSubscriptionConfig } from "relay-runtime";
import { MqttRecentMessagesCtxProvider } from "./MqttRecentMessagesCtxProvider";
import { useSearchParamHandler } from "../../../../../Hooks/useHandleSearchParam";
import { SelectItemType } from "../../../../../UIComponents/SelectList/SelectList";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import React, { useCallback, useMemo, useReducer,useState,useTransition } from "react";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttTopicsPaginationFragment$key } from "../TopicList/__generated__/MqttTopicsPaginationFragment.graphql";
import { MqttClientsPaginationFragment$key } from "../ClientList/__generated__/MqttClientsPaginationFragment.graphql";
import { MqttRecentMessagesPaginationFragment$key } from "./__generated__/MqttRecentMessagesPaginationFragment.graphql";
import { MqttRecentMessagesNewMessageSubscription } from "./__generated__/MqttRecentMessagesNewMessageSubscription.graphql";
import { MqttRecentMessagesPaginationFragmentRefetchQuery } from "./__generated__/MqttRecentMessagesPaginationFragmentRefetchQuery.graphql";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttRecentMessagesNewMessageTag = graphql`
    subscription MqttRecentMessagesNewMessageSubscription(
      $id:ID!
      $client_id:ID
      $topic_id:ID
    ) {
        mqttServerNewMessage(
          server_id:$id,
          client_id:$client_id,
          topic_id:$topic_id
        ){
          id
          ...MqttRecentMessagesItemDataFragment
        }
    }
`;

const MqttRecentMessagesPaginationFragment = graphql`
  fragment MqttRecentMessagesPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
    topic_uid: { type: "ID", defaultValue: null  }
    client_uid: { type: "ID", defaultValue: null }
  )
  @refetchable(queryName: "MqttRecentMessagesPaginationFragmentRefetchQuery") {
    __id
    mqttServerRecentMessages(
        server_uid:$server_uid,
        first: $first,
        after: $after,
        client_uid:$client_uid,
        topic_uid:$topic_uid
      )
      @connection(key: "MqttRecentMessagesPaginationFragmentConnection_mqttServerRecentMessages") {
      __id
      edges {
        node {
          id
          ...MqttRecentMessagesItemDataFragment
        }
      }
    }
  }
`;

export const MESSAGE_PARAM_NAME = "message_id"

export default React.memo(MqttRecentMessages)

type MqttRecentMessagesProps = {
  dataRef: (MqttRecentMessagesPaginationFragment$key | null) & 
  (MqttClientsPaginationFragment$key | null ) &
  MqttTopicsPaginationFragment$key | null ;
}

export const defaultClinet = {
  id: undefined,
  data: "All Clients",
  displayName: "All Clients",
} as SelectItemType<string>

export const defaultTopic = {
  id: undefined,
  data: "All Topics",
  displayName: "All Topics",
} as SelectItemType<string>


function MqttRecentMessages({dataRef}:MqttRecentMessagesProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, open, close] = useSearchParamHandler(MESSAGE_PARAM_NAME);
  
  const [topic_filter, setTopicFilter] = useState(defaultTopic);

  const [client_filetr, setClientFilter] = useState(defaultClinet);

  const handleTopicFilterChange = useCallback(
    (data:SelectItemType<string>) => {
      setTopicFilter(data)
    },
    [setTopicFilter],
  )
 
  const handleClientFilterChange = useCallback(
    (data:SelectItemType<string>) => {
      setClientFilter(data)
    },
    [setClientFilter],
  )

  return <MqttRecentMessagesCtxProvider>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={close}
      component={
        <MqttRecentMessageDetail />
      }
    />
    <Section 
      bar={<MqttRecentMessagesBar
      dataRef={dataRef}
      topic_filter={topic_filter}
      client_filter={client_filetr}
      onClinetFilterChange={handleClientFilterChange}
      onTopicFilterChange={handleTopicFilterChange}
    />}
      name={"Recent Messages"}
      component={
      <InfinityScrollTable
        header={<Header/>}
      >
        <MessagesListBody
         dataRef={dataRef}
         topic_filter={topic_filter}
         client_filter={client_filetr}
         />
      </InfinityScrollTable>
    }
  />
  </MqttRecentMessagesCtxProvider>
}


type MessagesListBodyProps = {
  topic_filter:SelectItemType<string>
  client_filter:SelectItemType<string>
} & MqttRecentMessagesProps

function MessagesListBody({
  dataRef,
  topic_filter,
  client_filter
}:MessagesListBodyProps){

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const [searchParams, setSearchParams] = useSearchParams();

  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition({
    busyDelayMs: 2000,
  });

  const pagination = usePaginationFragment<
  MqttRecentMessagesPaginationFragmentRefetchQuery,
  MqttRecentMessagesPaginationFragment$key
  >(MqttRecentMessagesPaginationFragment, dataRef);

  useDidMountEffect(() => {
    startTransition(() => {
      pagination.refetch({
        server_uid:server_id,
        client_uid:client_filter.id ?? null,
        topic_uid:topic_filter.id ?? null,
        first:100
      })
    
    },);
  }, [topic_filter,client_filter])
  
  useDidMountEffect(() => {
    dispatch({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      type:LinkedListActionKind.Init,
      payload:pagination.data?.mqttServerRecentMessages?.edges
  })
  }, [pagination.data])
  

  const [data_list, dispatch] = useReducer(
    messagesReducer,InitMetricsBuffer(pagination.data?.mqttServerRecentMessages?.edges)
  );

  const debounced: {
    data: LinkedList<MessageNode>;
  } = useRenderDebounce(data_list,500)

  const normalised_data = useMemo(() =>  debounced.data.traverse(), [debounced])
  
  const message_sub = useMemo(() => ({
    variables: {
      id:server_id,
      client_id:client_filter.id ?? null,
      topic_id:topic_filter.id ?? null
    },
    subscription:MqttRecentMessagesNewMessageTag,
    updater: (store,data) => { 
      if(data && data.mqttServerNewMessage){
        dispatch({
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            type:LinkedListActionKind.Add,
            payload:{
              node: data.mqttServerNewMessage
            }
        })
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttRecentMessagesNewMessageSubscription>), [server_id,client_filter,topic_filter]);

  useSubscription<MqttRecentMessagesNewMessageSubscription>(message_sub);

  const handleItemDetail = useCallback(
    (message_id: string | null | undefined) => {
      searchParams.delete(MESSAGE_PARAM_NAME);
      if (message_id) {
        searchParams.append(MESSAGE_PARAM_NAME, message_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <InfinityScrollBody
  height="h-80"
  >
    {
      normalised_data?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttRecentMessagesItem 
          key={edge.node?.id??index}
          dataRef={edge.node}
          onItemClick={handleItemDetail}
        />
      })
    }
</InfinityScrollBody>

}

function Header(){
  return <TableHeader>
    <tr className="flex w-6/12 2xl:w-3/12">
      <th>Client</th>
    </tr>
    <tr className="w-6/12 2xl:w-6/12 hidden 2xl:flex">
      <th>Topic</th>
    </tr>
    <tr className="flex justify-center items-center text-center w-5/12 2xl:w-3/12">
      <th>TimeStamp</th>
    </tr>
  </TableHeader>
}

// ----------------------------------

type MessagesData = readonly MessageNode[] | null | undefined

type MessageNode = {
    readonly node: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"MqttRecentMessagesItemDataFragment">;
  } | null;
}

function InitMetricsBuffer(data: MessagesData){
  const linked_list = new LinkedList<MessageNode>();

  data?.forEach(e=>{
    if(e !== null && e !== undefined){
      linked_list.insertAtEnd(e);
    }
  });
  
  return {data:linked_list};
}

// ----------------------------------

enum LinkedListActionKind {
  Add = 'ADD',
  Clear = `Clear`,
  Init = `Init`
}

interface LinkedListAction {
  type: LinkedListActionKind;
  payload: any
}

const TREND_MAX = 50;

function messagesReducer(state:{data:LinkedList<MessageNode>}, action:LinkedListAction) {
  switch (action.type) {
    case LinkedListActionKind.Add:

    if(state.data.size() > TREND_MAX){
      state.data.deleteLast();
      state.data.insertInBegin(action.payload)
    }else{
      state.data.insertInBegin(action.payload)
    }
      return {
        data:state.data
      }
      
    case LinkedListActionKind.Clear:

      return {
        data: new LinkedList<MessageNode>()
      }

    case LinkedListActionKind.Init:

      return {
        data: InitMetricsBuffer(action.payload).data
      }
  
    default:
      throw new Error();
  }
}
