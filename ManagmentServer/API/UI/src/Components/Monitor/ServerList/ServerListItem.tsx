import clsx from "clsx";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../UIComponents/Badged/Badge";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import { useCallback, useMemo, useTransition } from "react";
import { GetMqttServerStateBadgetVariant } from "../../../Shared/Common";
import { GQL_ServerVariant, ServerListItemDataFragment$key } from "./__generated__/ServerListItemDataFragment.graphql";
import { ServerListItemServerStateChengedSubscription } from "./__generated__/ServerListItemServerStateChengedSubscription.graphql";


const ServerListItemDataFragment = graphql`
  fragment ServerListItemDataFragment on GQL_IServer {
      id
      name
      state
      type
      __typename
  }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const ServerListItemServerStateChengedSubscriptionTag = graphql`
    subscription ServerListItemServerStateChengedSubscription($id:ID!) {
        serverStateChanged(server_id: $id) {
            server_Uid
            state
            ...ServerListItemDataFragment
        }
    }
`;

type ServerListItemProps = {
  dataRef:ServerListItemDataFragment$key | null;
  key_?:string
}

export function ServerListItem({dataRef, key_}:ServerListItemProps){

  const data = useFragment(ServerListItemDataFragment, dataRef);
  
  const state_sub = useMemo(() => ({
    variables: {id:data?.id},
    subscription:ServerListItemServerStateChengedSubscriptionTag,
    updater: (store,element) => { 
        if(element?.serverStateChanged?.server_Uid){
            var server_data = store.get(element.serverStateChanged.server_Uid);
            
            server_data?.setValue(element.serverStateChanged.state,"state")
        }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<ServerListItemServerStateChengedSubscription>), [data]);

  useSubscription<ServerListItemServerStateChengedSubscription>(state_sub);

  const state_variant = useMemo(
    () => {
      return GetMqttServerStateBadgetVariant(data?.state)
    },
    [data?.state],
  )
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const navigate = useNavigate();
  
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {

        PreventDefaults(e);

        var prefix = GetPathPrefix(data?.type);
        
        prefix && data?.id && startTransition(() => {
          navigate(`/Monitor/Server/${prefix}/${data.id}`)
        });
    },
    [data, navigate],
  )

  return <tbody onClick={handleClick} key={key_} className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer justify-between py-1 hover:bg-gray-200",
    "rounded-sm hover:shadow-sm px-2 md:px-5")}>
    <tr className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <td className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </td>
    </tr>
    <tr className={clsx("w-3/12 2xl:w-2/12 flex truncate",
      "justify-center text-center font-mono")}>
      <td>
        <ServerType type={data?.__typename}/>
      </td>
    </tr>
    <tr className="w-3/12 2xl:w-2/12 flex justify-center text-center">
      <td>
        <Badge
          turncate
          border={false}
          className="text-xxs"
          size="thin"
          variant={state_variant}>
          {data?.state}
        </Badge>
      </td>
    </tr>
  </tbody>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}

function GetPathPrefix(type: GQL_ServerVariant | undefined) {
  var prefix = null;

  switch (type) {
    case "MQTT":
      prefix = "Mqtt";
      break;
    case "OPC":
      prefix = "Opc";
      break;
  }
  
  return prefix;
}

// -------------------------------

type ServerTypeProps = {
  type: string | undefined
}

function ServerType({type}:ServerTypeProps){

  var name = "N/A";
  var variant: "ternarygray" | "ternaryyellow" | "ternaryblue" = "ternarygray"

  switch (type) {
    case "GQL_MqttServer": 
      name = "MQTT"; variant="ternaryyellow";
      break;

    case "GQL_OpcServer": 
      name = "OPC"; variant="ternaryblue"
      break; 
  }

  return <Badge
    turncate
    border={false}
    className="text-xxs"
    size="thin"
    variant={variant}
  >
    {name}
  </Badge>
}
