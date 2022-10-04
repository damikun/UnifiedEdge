import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import Badge from "../../../UIComponents/Badged/Badge";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import { GetMqttServerStateBadgetVariant } from "../../../Shared/Common";
import { faPlay, faRefresh, faStop } from "@fortawesome/free-solid-svg-icons";
import StayledButton, { STAYLED_BUTTON_VARIANTS } from "../../../UIComponents/Buttons/StayledButton";
import { GQL_ServerCmd, ServerInfoStateProcessCmdMutation } from "./__generated__/ServerInfoStateProcessCmdMutation.graphql";
import { ServerInfoStateDataFragment$data, ServerInfoStateDataFragment$key } from "./__generated__/ServerInfoStateDataFragment.graphql";


const ServerInfoStateDataFragment = graphql`
    fragment ServerInfoStateDataFragment on GQL_IServer
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
        }
    }   
}
`

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

    const [commit,isInFlight] = useMutation<ServerInfoStateProcessCmdMutation>(ServerInfoStateProcessCmdMutationTag);

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
                if(response.processServerCmd?.gQL_ServerState){

                var server = store.get(data.id)

                server?.setValue(response.processServerCmd.gQL_ServerState,"state");
            }

                // HandleErrors(toast, response.createServer?);
                // if (response.createServer?.errors?.length === 0) {
                //   startTransition(() => {
                //     navigate(`/Hooks`);
                //   });
                // }
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
    
    // const uptime_sub_config = useMemo(() => ({
    //     variables: {},
    //     subscription:UptimeSub,
    //     updater: store => { },
    //     onCompleted: () => {} /* Subscription established */,
    //     onError: error => {} /* Subscription errored */,
    //     onNext: response => {} /* Subscription payload received */,
    //   }as GraphQLSubscriptionConfig<ServerInfoStateUptimeSubscription>), []);
    
    // useSubscription<ServerInfoStateUptimeSubscription>(uptime_sub_config);

    // const datetime_sub_config = useMemo(() => ({
    //     variables: {},
    //     subscription:DateTimeSub,
    //     updater: store => { },
    //     onCompleted: () => {} /* Subscription established */,
    //     onError: error => {} /* Subscription errored */,
    //     onNext: response => {} /* Subscription payload received */,
    //   }as GraphQLSubscriptionConfig<ServerInfoStateDateTimeSubscription>), []);
    
    // useSubscription<ServerInfoStateDateTimeSubscription>(datetime_sub_config);

    const behaviour = useMemo(() => {
        return getBehaviour(data);
    }, [data])

    return <div className={clsx("flex flex-row w-full justify-between space-x-2 items-center")}>
            <div className="flex flex-col space-y-1 justify-end p-2 overflow-hidden">
                <div className="font-semibold text-base capitalize text-center truncate">
                    State
                </div>
            <div className={clsx("text-gray-600 text-sm w-full justify-end",
            " truncate capitalize text-end whitespace-pre items-center")}>
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
        
        <div className={clsx("p-2 bg-gray-100 flex-col",
            "m-2 justify-cente flex items-center")}>
            <div className="flex-row flex space-x-2 px-2 py-1 bg-gray-200 shadow-sm rounded-lg">
                <StayledButton
                    variant={behaviour.play.variant}
                    disabled={!behaviour.play.enabled || isInFlight}
                    className={behaviour.play.className}
                    iconOnly
                    iconLeft={faPlay}
                    onClick={handleStart}
                />
                <Divider/>
                <StayledButton
                    variant={behaviour.stop.variant}
                    disabled={!behaviour.stop.enabled || isInFlight}
                    className={behaviour.stop.className}
                    iconOnly
                    iconLeft={faStop}
                    onClick={handleStop}
                />
                <Divider/>
                <StayledButton
                    variant={behaviour.restart.variant}
                    disabled={!behaviour.restart.enabled || isInFlight}
                    className={behaviour.restart.className}
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
