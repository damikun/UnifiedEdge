import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { MqttRecentMessagesItemDataFragment$key } from "./__generated__/MqttRecentMessagesItemDataFragment.graphql";


const MqttRecentMessagesItemDataFragment = graphql`
  fragment MqttRecentMessagesItemDataFragment on GQL_MqttMessage {
    id
    clientUid
    topic
  }
`;

type MqttRecentMessagesItemProps = {
  dataRef: MqttRecentMessagesItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function MqttRecentMessagesItem({dataRef, onItemClick,key_}:MqttRecentMessagesItemProps){

  const data = useFragment(MqttRecentMessagesItemDataFragment, dataRef);
  
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
    <td className="w-5/12 2xl:w-4/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.clientUid}
      </div>
    </td>
    <td className={clsx("w-7/12 2xl:w-8/12 flex truncate",
      "justify-center text-sm")}>
      <div className="truncate break-all">
        {data?.topic}
      </div>
    </td>
  </TableItem>
}
