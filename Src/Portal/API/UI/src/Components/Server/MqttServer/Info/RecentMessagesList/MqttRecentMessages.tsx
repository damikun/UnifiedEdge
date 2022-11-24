import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import { LinkedList } from "../../../../../Shared/LinkedList";
import MqttRecentMessageDetail from "./MqttRecentMessageDetail"
import React, { useCallback, useMemo, useReducer } from "react";
import Section from "../../../../../UIComponents/Section/Section";
import { MqttRecentMessagesItem } from "./MqttRecentMessagesItem";
import { usePaginationFragment, useSubscription } from "react-relay";
import useRenderDebounce from "../../../../../Hooks/useRenderDebounce";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import { FragmentRefs, GraphQLSubscriptionConfig } from "relay-runtime";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
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
        mqttServerNewMessage(server_id:$id,client_id:$client_id,topic_id:$topic_id){
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
  )
  @refetchable(queryName: "MqttRecentMessagesPaginationFragmentRefetchQuery") {
    __id
    mqttServerRecentMessages(server_uid:$server_uid, first: $first, after: $after)
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
  dataRef: MqttRecentMessagesPaginationFragment$key | null;
}

function MqttRecentMessages({dataRef}:MqttRecentMessagesProps) {

  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(MESSAGE_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(MESSAGE_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return  <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <MqttRecentMessageDetail />
      }
    />
    <Section 
    name={"Recent Messages"}
    component={
      <InfinityScrollTable
        header={<Header/>}
      >
        <TopicListBody dataRef={dataRef}/>
      </InfinityScrollTable>
    }
  />
  </>
}


type TopicListBodyProps = {

}&MqttRecentMessagesProps

function TopicListBody({dataRef}:TopicListBodyProps){

  const { id }: any = useParams<string>();

  const [searchParams, setSearchParams] = useSearchParams();

  const pagination = usePaginationFragment<
  MqttRecentMessagesPaginationFragmentRefetchQuery,
  MqttRecentMessagesPaginationFragment$key
  >(MqttRecentMessagesPaginationFragment, dataRef);

  const [data_list, dispatch] = useReducer(
    messagesReducer,InitMetricsBuffer(pagination.data?.mqttServerRecentMessages?.edges)
  );

  const debounced: {
    data: LinkedList<MessageNode>;
  } = useRenderDebounce(data_list,500)

  const normalised_data = useMemo(() =>  debounced.data.traverse(), [debounced])
  
  const message_sub = useMemo(() => ({
    variables: {id:id,},
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
  }as GraphQLSubscriptionConfig<MqttRecentMessagesNewMessageSubscription>), [id]);

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
