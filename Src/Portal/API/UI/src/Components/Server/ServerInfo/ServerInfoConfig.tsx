import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../UIComponents/Modal/Modal";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { ServerInfoConfigDataFragment$key } from "./__generated__/ServerInfoConfigDataFragment.graphql";
import { ServerInfoConfigMatchSubscription } from "./__generated__/ServerInfoConfigMatchSubscription.graphql";
import ServerInfoConfigModal from "./ServerInfoConfigModal";


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

export const CFG_PARAM_NAME = "config"

export default function ServerInfoConfig({dataRef}:ServerInfoConfigProps){

    const data = useFragment(ServerInfoConfigDataFragment, dataRef);
    
    const { id }: any = useParams<string>();
    
    const sub = useMemo(() => ({
        variables: {id:id},
        subscription:ServerInfoConfigMatchTag,
        updater: (store,element) => { 
            if(element.mqttServerConfigState){
                var server = store.get(id);

                server?.setValue(
                    element.mqttServerConfigState.isMatch,
                    "isConfigMatch"
                );
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
        () => data.configState?.offlineTimeStamp ?
        new Date(data.configState?.offlineTimeStamp).toLocaleString() :
        "N/A",
        [data.configState?.offlineTimeStamp]
    )

    const icon = useMemo(
        () => data.isConfigMatch?faCheckCircle:faExclamationTriangle,
        [data.isConfigMatch]
    )
    
    
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(CFG_PARAM_NAME)!== null && id, [searchParams,id]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(CFG_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemDetail = useCallback(
    () => {
      searchParams.delete(CFG_PARAM_NAME);
      id && searchParams.append(CFG_PARAM_NAME, "true");
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams,id]
  );


    return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <ServerInfoConfigModal server_id={id} />
      }
    />
    <div onClick={handleItemDetail} className={clsx("flex flex-row w-full justify-between",
    "space-x-2 items-center cursor-pointer")}>

    <div className={clsx("p-2 h-10 w-10 lg:w-12 lg:h-12 rounded-full",
        "bg-gray-50 m-2 justify-cente flex")}>
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
</>
}