import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../../UIComponents/Table/TableItem";
import { SchedulerRecurringJobItemDataFragment$key } from "./__generated__/SchedulerRecurringJobItemDataFragment.graphql";



const SchedulerRecurringJobItemDataFragment = graphql`
  fragment SchedulerRecurringJobItemDataFragment on GQL_RecurringJob { 
    id
    callName
    lastJobState
    lastExecution
    nextExecution
  }
`;

type SchedulerRecurringJobItemProps = {
  dataRef:SchedulerRecurringJobItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function SchedulerRecurringJobItem({dataRef, onItemClick, key_}:SchedulerRecurringJobItemProps){

  const data = useFragment(SchedulerRecurringJobItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick(data.id)
      });
    },
    [onItemClick,data],
  )

  const last_dt = useMemo(()=>{
    return GetLocalDate(data?.lastExecution);
  },[data]) 

  const next_dt = useMemo(()=>{
    return GetLocalDate(data?.nextExecution);
  },[data])


  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-5/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.callName}
      </div>
    </td>
    <td className={clsx("w-2/12 2xl:w-2/12 flex truncate text-gray-500",
        "justify-center text-center font-mono font-semibold text-sm hidden lg:flex")}>
       {data?.lastJobState}
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {last_dt}
      </div>
    </td>
  </TableItem>
}
