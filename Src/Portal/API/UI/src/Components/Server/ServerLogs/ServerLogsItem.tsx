import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { ServerLogTypeBadget } from "./ServerLogType";
import { GetLocalDate } from "../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../UIComponents/Table/TableItem";
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
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function ServerLogsItem({dataRef, onItemClick,key_}:ServerLogsItemProps){

  const data = useFragment(ServerLogsItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.iD && startTransition(() => {
        onItemClick(data.iD)
      });
    },
    [onItemClick,data],
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

  return <TableItem
    onClick={handleClick}
    key={data?.iD}
    className={clsx(bg_color,"border-l-2",
    data?.type==="ERROR"?"border-red-500":"border-transparent")}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </div>
    </td>
    <td className={clsx("w-1/12 2xl:w-2/12 flex truncate text-gray-500",
        "justify-center text-center font-mono font-semibold text-sm hidden lg:flex")}>
        <div className="truncate">
          <ServerLogTypeBadget state={data?.type}/>
        </div>
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt}
      </div>
    </td>
  </TableItem>
}
