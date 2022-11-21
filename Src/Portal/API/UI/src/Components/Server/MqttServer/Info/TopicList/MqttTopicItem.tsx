import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { MqttTopicItemDataFragment$key } from "./__generated__/MqttTopicItemDataFragment.graphql";


const MqttTopicItemDataFragment = graphql`
  fragment MqttTopicItemDataFragment on GQL_MqttTopic {
    id
    serverUid
    topic
    stats {
      id
      messagesCount
    }
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
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick(data.id)
      });
    },
    [onItemClick,data],
  )

  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-8/12 2xl:w-9/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.topic}
      </div>
    </td>
    <td className={clsx("w-4/12 2xl:w-3/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate break-all">
        {data?.stats.messagesCount}
      </div>
    </td>
  </TableItem>
}
