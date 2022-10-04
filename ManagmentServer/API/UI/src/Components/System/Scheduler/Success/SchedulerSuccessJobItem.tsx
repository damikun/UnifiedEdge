import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import { SchedulerSuccessJobItemDataFragment$key } from "./__generated__/SchedulerSuccessJobItemDataFragment.graphql";


const SchedulerSuccessJobItemDataFragment = graphql`
  fragment SchedulerSuccessJobItemDataFragment on GQL_SuccessJob {
    id
    name
    succeededAt
    totalDuration
  }
`;

type SchedulerSuccessJobItemProps = {
  dataRef:SchedulerSuccessJobItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function SchedulerSuccessJobItem({dataRef, onItemClick, key_}:SchedulerSuccessJobItemProps){

  const data = useFragment(SchedulerSuccessJobItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick(data.id)
      });
    },
    [onItemClick,data],
  )

  const dt = useMemo(()=>{
    return GetLocalDate(data?.succeededAt);
  },[data]) 

  const duration = useMemo(() => {

    if(data?.totalDuration){
      return data?.totalDuration / 1000
    }else{
      return ""
    }
     
  }, [data])

  return <div
    onClick={handleClick}
    key={data?.id}
    className={clsx("flex space-y-1 space-x-2 hover:bg-gray-200",
    "text-center cursor-pointer justify-between py-1",
    "rounded-sm hover:shadow-sm px-2 md:px-5"
    )}>
    <div className="w-5/12 2xl:w-6/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </div>
    </div>
    <div className={clsx("w-2/12 2xl:w-3/12 flex truncate text-gray-500",
        "justify-center text-center font-mono font-semibold text-sm hidden lg:flex")}>
       {`${duration}s`}
    </div>
    <div className={clsx("w-5/12 2xl:w-3/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt}
      </div>
    </div>
  </div>
}
