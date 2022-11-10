import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../UIComponents/Badged/Badge";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import { useFragment, useMutation, useSubscription } from "react-relay";
import { GetMqttServerStateBadgetVariant } from "../../../Shared/Common";
import { faPlay, faRefresh, faStop } from "@fortawesome/free-solid-svg-icons";
import { ServerInfoStateSubscription } from "./__generated__/ServerInfoStateSubscription.graphql";
import StayledButton, { STAYLED_BUTTON_VARIANTS } from "../../../UIComponents/Buttons/StayledButton";
import { GQL_ServerCmd, ServerInfoStateProcessCmdMutation } from "./__generated__/ServerInfoStateProcessCmdMutation.graphql";
import { ServerInfoStateDataFragment$data, ServerInfoStateDataFragment$key } from "./__generated__/ServerInfoStateDataFragment.graphql";



const ServerInfoStateDataFragment = graphql`
    fragment ServerInfoStateDataFragment  on GQL_IServer
    {
        id
        state
    }
`;

const ServerInfoStateProcessCmdMutationTag = graphql`
    mutation ServerInfoStateProcessCmdMutation($input: ProcessServerCmdInput!) {
        processServerCmd(input: $input) {
        ... on ProcessServerCmdPayload {          
            gQL_ServerState
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

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ServerInfoStateSubscriptionRef = graphql`
    subscription ServerInfoStateSubscription($id:ID!) {
        serverStateChanged(server_id: $id) {
            server_Uid
            state
        }
    }
`;

type ServerInfoStateProps = {
    dataRef:ServerInfoStateDataFragment$key;
};

type allowedCommands = {
    play: actionType
    stop: actionType
    restart: actionType
}

type actionType = {
    variant:  keyof typeof STAYLED_BUTTON_VARIANTS,
    enabled: boolean,
    className: string
}

export default function ServerInfoState({dataRef}:ServerInfoStateProps){

    const data = useFragment(ServerInfoStateDataFragment, dataRef);

    const state_variant = useMemo(
        () => {
            return GetMqttServerStateBadgetVariant(data?.state)
        },
        [data?.state],
    )

    const [commit,isInFlight] = useMutation<ServerInfoStateProcessCmdMutation>(
        ServerInfoStateProcessCmdMutationTag
    );

    const toast = useToast();
    
    const handleCommand = useCallback(
        (cmd:GQL_ServerCmd) => {
        !isInFlight && commit({
            variables: {
              input: {
                uid: data.id,
                cmd:cmd
              }
            },
    
            onError(error) {
              toast?.pushError("Failed to process mutation");
              console.log(error);
            },
    
            onCompleted(response) {},
    
            updater(store, response) {
                if(response?.processServerCmd?.gQL_ServerState){
                    var server = store.get(data.id)

                    server?.setValue(response.processServerCmd.gQL_ServerState,"state");
                }

                HandleErrors(toast, response?.processServerCmd?.errors);
            },
    
          });
      },
      [commit, isInFlight, data, toast],
    )
    
    const handleStart = useCallback(
        () => {
            handleCommand("START")
        },
        [handleCommand],
    )
    
    const handleStop = useCallback(
        () => {
            handleCommand("STOP")
        },
        [handleCommand],
    )

    const handleRestart = useCallback(
        () => {
            handleCommand("RESTART")
        },
        [handleCommand],
    )
    
    const state_sub = useMemo(() => ({
        variables: {id:data.id},
        subscription:ServerInfoStateSubscriptionRef,
        updater: (store,element) => { 
            if(element?.serverStateChanged?.server_Uid){
                var server_data = store.get(element.serverStateChanged.server_Uid);
                
                server_data?.setValue(element.serverStateChanged.state,"state")
            }
        },
        onCompleted: () => {} /* Subscription established */,
        onError: error => {} /* Subscription errored */,
        onNext: response => {} /* Subscription payload received */,
      }as GraphQLSubscriptionConfig<ServerInfoStateSubscription>), [data]);
    
    useSubscription<ServerInfoStateSubscription>(state_sub);

    const behaviour = useMemo(() => {
        return getBehaviour(data);
    }, [data])

    return <div className={clsx("flex flex-row w-full justify-between space-x-2 items-center")}>
        <div className="flex flex-col space-y-1 justify-end p-2 overflow-hidden w-28">
            <div className="font-semibold text-base capitalize text-center truncate">
                State
            </div>
            <div className={clsx("text-gray-600 text-sm w-full justify-end",
            "truncate capitalize text-end whitespace-pre items-center")}>
                <Badge
                    turncate
                    border={false}
                    className="text-xxs mx-auto"
                    size="thin"
                    variant={state_variant}>
                    {data?.state}
                </Badge>    
            </div>
        </div>
        
        <div className={clsx("p-2 bg-gray-50 flex-col",
            "m-2 justify-cente flex items-center")}>
            <div className="flex-row flex space-x-2 px-2 py-1 bg-gray-200 shadow-sm rounded-lg">
                <StayledButton
                    variant={behaviour.play.variant}
                    disabled={!behaviour.play.enabled || isInFlight}
                    className={clsx(behaviour.play.className,"h-7 w-9")}
                    isloading={data.state === "STARTING"}
                    iconOnly
                    iconLeft={faPlay}
                    onClick={handleStart}
                />
                <Divider/>
                <StayledButton
                    variant={behaviour.stop.variant}
                    disabled={!behaviour.stop.enabled || isInFlight}
                    className={clsx(behaviour.stop.className,"h-7 w-9")}
                    isloading={data.state === "STOPPING"}
                    iconOnly
                    iconLeft={faStop}
                    onClick={handleStop}
                />
                <Divider/>
                <StayledButton
                    variant={behaviour.restart.variant}
                    disabled={!behaviour.restart.enabled || isInFlight}
                    className={clsx(behaviour.restart.className,"h-7 w-9")}
                    isloading={data.state === "RESTARTING"}
                    iconOnly
                    iconLeft={faRefresh}
                    onClick={handleRestart}
                />
            </div>
        </div>
    </div>
}

function Divider(){
    return <div className="whitespace-pre w-0.5 bg-gray-300 bg-opacity-80"></div>
}

function getBehaviour(data: ServerInfoStateDataFragment$data) {
    switch (data.state) {
        case "STOPPED":
            return {
                play: {
                    variant: "primaryblue",
                    enabled: true,
                },
                stop: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
                restart: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
            } as allowedCommands;
        case "STARTED":
            return {
                play: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
                stop: {
                    variant: "primaryred",
                    enabled: true
                },
                restart: {
                    variant: "primaryblue",
                    enabled: true
                },
            } as allowedCommands;
        case "RESTARTING":
        case "STARTING":
        case "STOPPING":
        case "UNDEFINED":
        case "DISABLED":
        default:
            return {
                play: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
                stop: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
                restart: {
                    variant: "primarygray",
                    enabled: false,
                    className: "opacity-70"
                },
            } as allowedCommands;
    }
}
