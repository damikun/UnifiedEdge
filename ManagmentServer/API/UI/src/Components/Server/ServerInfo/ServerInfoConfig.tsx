import clsx from "clsx";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { ServerInfoConfigDataFragment$key } from "./__generated__/ServerInfoConfigDataFragment.graphql";
import { ServerInfoConfigMatchSubscription } from "./__generated__/ServerInfoConfigMatchSubscription.graphql";


const ServerInfoConfigDataFragment = graphql`
    fragment ServerInfoConfigDataFragment on GQL_IServer
    {   
        isConfigMatch

        configState {
          isConfigMatch
          offlineTimeStamp
          onlineTimeStamp
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ServerInfoConfigMatchTag = graphql`
    subscription ServerInfoConfigMatchSubscription(
      $id:ID!
    ) {
        mqttServerConfigState(server_id: $id){
            isMatch
        }
    }
`;

type ServerInfoConfigProps = {
    dataRef:ServerInfoConfigDataFragment$key;
};

export default function ServerInfoConfig({dataRef}:ServerInfoConfigProps){

    const data = useFragment(ServerInfoConfigDataFragment, dataRef);
    
    const { id }: any = useParams<string>();
    
    const sub = useMemo(() => ({
        variables: {id:id},
        subscription:ServerInfoConfigMatchTag,
        updater: (store,element) => { 
            if(element.mqttServerConfigState){
                var server = store.get(id);

                server?.setValue(element.mqttServerConfigState.isMatch,"isConfigMatch");
            }
        },
        onCompleted: () => {} /* Subscription established */,
        onError: error => {} /* Subscription errored */,
        onNext: response => {} /* Subscription payload received */,
    }as GraphQLSubscriptionConfig<ServerInfoConfigMatchSubscription>), [id]);

    useSubscription<ServerInfoConfigMatchSubscription>(sub);

    const name = useMemo(
        () => data.isConfigMatch? 
        `Config match`: `Config mismatch`,
        [data.isConfigMatch]
    )

    const config_timestamp = useMemo(
        () => data.configState?.offlineTimeStamp ?new Date(data.configState?.offlineTimeStamp).toLocaleString():"N/A",
        [data.configState?.offlineTimeStamp]
    )

    const icon = useMemo(
        () => data.isConfigMatch?faCheckCircle:faExclamationTriangle,
        [data.isConfigMatch]
    )
    
    return <div className={clsx("flex flex-row w-full justify-between",
    "space-x-2 items-center")}>

    <div className={clsx("p-2 h-10 w-10 lg:w-12 lg:h-12 rounded-full",
        "bg-gray-100 m-2 justify-cente flex")}>
        <FontAwesomeIcon 
            className={clsx("mx-auto my-auto text-xl lg:text-2xl",
            data.isConfigMatch ?"text-blue-500":"text-orange-500")}
            icon={icon} 
        />
    </div>

    <div className="flex flex-col space-y-1 justify-end p-2 overflow-hidden">
        <div className="font-semibold text-base capitalize text-end truncate">
            {name}
        </div>
        <div className={clsx("text-gray-600 text-sm w-full justify-end",
        " truncate capitalize text-end whitespace-pre")}>
            {config_timestamp}
        </div>
    </div>
</div>
}