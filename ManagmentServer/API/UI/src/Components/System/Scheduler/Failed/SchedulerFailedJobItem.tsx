import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../../UIComponents/Table/TableItem";
import { SchedulerFailedJobItemDataFragment$key } from "./__generated__/SchedulerFailedJobItemDataFragment.graphql";


const SchedulerFailedJobItemDataFragment = graphql`
  fragment SchedulerFailedJobItemDataFragment on GQL_FailedJob {
    id
    jobName
    reason
    failedAt  
  }
`;

type SchedulerFailedJobItemProps = {
  dataRef:SchedulerFailedJobItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function SchedulerFailedJobItem({dataRef, onItemClick, key_}:SchedulerFailedJobItemProps){

  const data = useFragment(SchedulerFailedJobItemDataFragment, dataRef);
  
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

  const dt = useMemo(()=>{
    return GetLocalDate(data?.failedAt);
  },[data]) 

  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-4/12 2xl:w-4/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.jobName}
      </div>
    </td>
    <td className={clsx("w-3/12 2xl:w-6/12 flex truncate text-gray-500",
        "text-start font-mono font-semibold text-sm hidden lg:flex")}>
       {data?.reason}
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
        {dt}
    </td>
  </TableItem>
}
