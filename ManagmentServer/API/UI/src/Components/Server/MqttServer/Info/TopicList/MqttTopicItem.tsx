import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import { MqttTopicItemDataFragment$key } from "./__generated__/MqttTopicItemDataFragment.graphql";


const MqttTopicItemDataFragment = graphql`
  fragment MqttTopicItemDataFragment on GQL_MqttServerTopicStat {
    id
    topic
    count
  }
`;

type MqttTopicItemProps = {
  dataRef: MqttTopicItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function MqttTopicItem({dataRef, onItemClick,key_}:MqttTopicItemProps){

  const data = useFragment(MqttTopicItemDataFragment, dataRef);
  
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

  return <div
    onClick={handleClick}
    key={data?.id}
    className={clsx("flex space-y-1 space-x-2 hover:bg-gray-200",
    "text-center cursor-pointer justify-between py-1",
    "rounded-sm hover:shadow-sm px-2 md:px-5")}>
    <div className="w-8/12 2xl:w-9/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.topic}
      </div>
    </div>
    <div className={clsx("w-4/12 2xl:w-3/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate break-all">
        {data?.count}
      </div>
    </div>
  </div>
}
