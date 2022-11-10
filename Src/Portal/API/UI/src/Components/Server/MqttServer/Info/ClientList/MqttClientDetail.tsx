import clsx from "clsx";
import { useMemo, useState } from "react";
import { JsonViewer } from "@textea/json-viewer";
import { CLIENT_PARAM_NAME } from "./MqttClients";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { GetLocalDate } from "../../../../../Shared/Common";
import Badge from "../../../../../UIComponents/Badged/Badge";
import { useParams, useSearchParams } from "react-router-dom";
import { useLazyLoadQuery, useSubscription } from "react-relay";
import { MqttClientDetailQuery } from "./__generated__/MqttClientDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttClientDetailSubscription } from "./__generated__/MqttClientDetailSubscription.graphql";


const MqttClientDetailTag = graphql`
  query MqttClientDetailQuery($server_uid:ID!,$server_client_uid:ID!) {
    mqttServerClient(
        server_uid:$server_uid,
        server_client_uid: $server_client_uid) {
          id
          protocol
          rawId
          serverUid
    }

    mqttServerClientStatistic(
        server_uid:$server_uid,
        server_client_uid: $server_client_uid) {
          id
          bytesReceived
          bytesSent

          sentPacketsCount
          receivedPacketsCount

          sentApplicationMessagesCount
          receivedApplicationMessagesCount

          lastNonKeepAlivePacketReceivedTimestamp
          lastPacketReceivedTimestamp
          lastPacketSentTimestamp
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientDetailSubscriptionTag = graphql`
    subscription MqttClientDetailSubscription(
      $server_id:ID!,
      $client_id:ID!,
    ) {
      mqttServerClientStatistics(server_id:$server_id, client_id:$client_id){
        clientId
        serverId

        stats {
            id
            bytesReceived
            bytesSent

            sentPacketsCount
            receivedPacketsCount

            sentApplicationMessagesCount
            receivedApplicationMessagesCount

            lastNonKeepAlivePacketReceivedTimestamp
            lastPacketReceivedTimestamp
            lastPacketSentTimestamp
        }
      }
    }
`;

export default function MqttClientDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  const [client_id] = useState(searchParams.get(CLIENT_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttClientDetailQuery>(
    MqttClientDetailTag,
    {server_uid:id,
    server_client_uid:client_id
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"webhookRecordDetailFetchKey"
    },
  );

  const data_sub = useMemo(() => ({
    variables: {
      client_id:client_id,
      server_id:server_id
    },
    subscription:MqttClientDetailSubscriptionTag,
    updater: (store,element) => { 

    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientDetailSubscription>), [client_id,server_id]);

  useSubscription<MqttClientDetailSubscription>(data_sub);


  const dt_lastPacketSentTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastPacketSentTimestamp);
  },[data]) 

  const dt_lastPacketReceivedTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastPacketReceivedTimestamp);
  },[data]) 

  const dt_lastNonKeepAlivePacketReceivedTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastNonKeepAlivePacketReceivedTimestamp);
  },[data]) 

  return <ModalContainer label="Client detail">
    <div className="flex flex-col space-y-2 max-w-xl md:w-96">

        <FieldGroup>
            <FieldSection className="items-center" name="Mqtt">
                <Badge
                turncate
                border={false}
                className="text-xxs border border-gray-200"
                size="thin"
                variant="ternarygray"
            >
                {data?.mqttServerClient.protocol}    
            </Badge>
            </FieldSection>
            <FieldSection name="Client Id">
                <div className="truncate font-sans text-gray-700 font-semibold text-sm">
                    {data?.mqttServerClient.rawId}
                </div>
            </FieldSection>
        </FieldGroup>

        {
            data.mqttServerClientStatistic && <>
            
                <FieldDivider/>

                <FieldGroup>
                    <FieldSection variant="flex-row" name="Last message">
                        {dt_lastNonKeepAlivePacketReceivedTimestamp}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Last packet send">
                        {dt_lastPacketSentTimestamp}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Last packet rcv">
                        {dt_lastPacketReceivedTimestamp}
                    </FieldSection>
                </FieldGroup>
            </>
        }

        {
            data.mqttServerClientStatistic && <>
            
                <FieldDivider/>

                <FieldGroup>
                    <FieldSection variant="flex-row" name="Messages send">
                        {data.mqttServerClientStatistic.sentApplicationMessagesCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Messages rcvd">
                        {data.mqttServerClientStatistic.receivedApplicationMessagesCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Packets send">
                        {data.mqttServerClientStatistic.sentPacketsCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Packets rcvd">
                        {data.mqttServerClientStatistic.receivedPacketsCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Bytes send">
                        {data.mqttServerClientStatistic.bytesSent}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Bytes rcv">
                        {data.mqttServerClientStatistic.bytesReceived}
                    </FieldSection>
                </FieldGroup>
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
    "bg-gray-50 z-50 rounded-sm shadow-sm overflow-hidden")}>
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