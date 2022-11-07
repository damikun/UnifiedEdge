import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { SystemLogTypeBadget } from "./SystemLogType";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../UIComponents/Table/TableItem";
import { SystemLogItemDataFragment$key } from "./__generated__/SystemLogItemDataFragment.graphql";


const SystemLogItemDataFragment = graphql`
  fragment SystemLogItemDataFragment on GQL_SystemEvent {
    iD
    name
    timeStamp
    type
  }
`;  

type SystemLogItemProps = {
  dataRef:SystemLogItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function SystemLogItem({dataRef, onItemClick,key_}:SystemLogItemProps){

  const data = useFragment(SystemLogItemDataFragment, dataRef);
  
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
       <SystemLogTypeBadget state={data?.type}/>
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt}
      </div>
    </td>
  </TableItem>
}
