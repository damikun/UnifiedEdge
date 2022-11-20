import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useTransition } from "react";
import { GetLocalDate } from "../../../../../Shared/Common";
import Badge from "../../../../../UIComponents/Badged/Badge";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { MqttClientItemDataFragment$key } from "./__generated__/MqttClientItemDataFragment.graphql";


const MqttClientItemDataFragment = graphql`
  fragment MqttClientItemDataFragment on GQL_MqttClient {
    id
    clientId
    protocol
    serverUid
    connectedTimeStamp
    disconnectedTimeStamp
    lastMessageTimestamp
  }
`;

type MqttClientItemProps = {
  dataRef: MqttClientItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function MqttClientItem({dataRef, onItemClick,key_}:MqttClientItemProps){

  const data = useFragment(MqttClientItemDataFragment, dataRef);
  
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

  const dt_connected = useMemo(()=>{
    return GetLocalDate(data?.connectedTimeStamp);
  },[data]) 

  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.clientId}
      </div>
    </td>
    <td className={clsx("w-1/12 2xl:w-2/12 flex truncate text-gray-500",
      "justify-center text-center font-mono font-semibold text-sm hidden lg:flex")}>
      <Badge
        turncate
        border={false}
        className="text-xxs"
        size="thin"
        variant="ternarygray"
      >
        {data?.protocol}    
      </Badge>
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt_connected}
      </div>
    </td>
  </TableItem>
}
