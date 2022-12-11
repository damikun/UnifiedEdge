import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { MqttLogTypeBadget } from "./MqttLogType";
import { GetLocalDate } from "../../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../../UIComponents/Table/TableItem";
import { MqttLogsItemDataFragment$key } from "./__generated__/MqttLogsItemDataFragment.graphql";


const MqttLogsItemDataFragment = graphql`
  fragment MqttLogsItemDataFragment on GQL_MqttServerLog {
    uid
    source
    message
    logLevel
    timeStamp
  }
`;

type MqttLogsItemProps = {
  dataRef:MqttLogsItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
}

export function MqttLogsItem({dataRef, onItemClick}:MqttLogsItemProps){

  const data = useFragment(MqttLogsItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.uid && startTransition(() => {
        onItemClick(data.uid)
      });
    },
    [onItemClick,data],
  )

  const dt = useMemo(()=>{
    return GetLocalDate(data?.timeStamp);
  },[data]) 

  
var bg_color = useMemo(() => {
  switch (data?.logLevel) {
    case "ERROR":
      return "bg-red-50"
    default:
      return "" 
  }
}, [data?.logLevel])

  return <TableItem
    onClick={handleClick}
    className={clsx(bg_color,"border-l-2",
    data?.logLevel==="ERROR"?"border-red-500":"border-transparent")}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.message}
      </div>
    </td>
    <td className={clsx("w-1/12 2xl:w-2/12 flex truncate text-gray-500",
      "justify-center text-center font-mono font-semibold text-sm hidden lg:flex")}>
      <div className="truncate">
        <MqttLogTypeBadget state={data?.logLevel}/>
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
