import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { MqttRecentMessagesItemDataFragment$key } from "./__generated__/MqttRecentMessagesItemDataFragment.graphql";
import { GetLocalDate } from "../../../../../Shared/Common";


const MqttRecentMessagesItemDataFragment = graphql`
  fragment MqttRecentMessagesItemDataFragment on GQL_MqttMessage {
    id
    clientUid
    topic
    clientId
    timeStamp
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

  const dt = useMemo(()=>{
    return data?.timeStamp ? GetLocalDate(data?.timeStamp): "N/A";
  },[data]) 

  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-3/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.clientId}
      </div>
    </td>
    <td className={clsx("w-6/12 2xl:w-6/12 hidden 2xl:flex truncate",
      "text-sm")}>
      <div className="truncate break-all font-mono">
        {data?.topic}
      </div>
    </td>

    <td className={clsx("w-5/12 2xl:w-3/12 flex truncate",
      "justify-center items-center text-sm")}>
      <div className="truncate break-all">
        {dt}
      </div>
    </td>
  </TableItem>
}
