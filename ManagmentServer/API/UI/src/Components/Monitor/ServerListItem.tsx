import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../UIComponents/Badged/Badge";
import { useCallback, useMemo, useTransition } from "react";
import { GetMqttServerStateBadgetVariant } from "../../Shared/Common";
import { GQL_ServerVariant, ServerListItemDataFragment$key } from "./__generated__/ServerListItemDataFragment.graphql";


const ServerListItemDataFragment = graphql`
  fragment ServerListItemDataFragment on GQL_IServer {
      id
      name
      state
      type
      __typename
  }
`;

type ServerListItemProps = {
  dataRef:ServerListItemDataFragment$key | null;
  key_?:string
}

export function ServerListItem({dataRef, key_}:ServerListItemProps){

  const data = useFragment(ServerListItemDataFragment, dataRef);
  
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
        
        prefix && startTransition(() => {
          navigate(`/Monitor/Server/${prefix}/`)
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
