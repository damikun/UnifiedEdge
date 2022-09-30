import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { ServerLogTypeBadget } from "./ServerLogType";
import { GetLocalDate } from "../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import { ServerLogsItemDataFragment$key } from "./__generated__/ServerLogsItemDataFragment.graphql";


const ServerLogsItemDataFragment = graphql`
  fragment ServerLogsItemDataFragment on GQL_IServerEvent {
    iD
    name
    timeStamp
    type
  }
`;

type ServerLogsItemProps = {
  dataRef:ServerLogsItemDataFragment$key | null;
  key_?:string
}

export function ServerLogsItem({dataRef, key_}:ServerLogsItemProps){

  const data = useFragment(ServerLogsItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const navigate = useNavigate();
  
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {

    },
    [],
  )

  const dt = useMemo(()=>{
    return GetLocalDate(data?.timeStamp);
},[data]) 

var bg_color = useMemo(() => {
  switch (data?.type) {
    case "ERROR":
      return "bg-red-50"  
    default:
      return "" 
  }
}, [data])

  return <div
    onClick={handleClick}
    key={data?.iD}
    className={clsx("flex space-y-1 space-x-2 hover:bg-gray-200",
    "text-center cursor-pointer justify-between py-1",
    "rounded-sm hover:shadow-sm px-2 md:px-5", bg_color,
    "border-l-2",
    data?.type==="ERROR"?"border-red-500":"border-transparent")}>
    <div className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </div>
    </div>
    <div className={clsx("w-1/12 2xl:w-2/12 flex truncate text-gray-500",
        "justify-center text-center font-mono font-semibold text-sm hidden md:flex")}>
        <div className="truncate">
          <ServerLogTypeBadget state={data?.type}/>
        </div>
    </div>
    <div className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt}
      </div>
    </div>
  </div>
}
