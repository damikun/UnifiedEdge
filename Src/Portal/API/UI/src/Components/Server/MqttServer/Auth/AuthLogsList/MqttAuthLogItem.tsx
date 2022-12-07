import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { MqttAuthLogItemDataFragment$key } from "./__generated__/MqttAuthLogItemDataFragment.graphql";


const MqttAuthLogItemDataFragment = graphql`
  fragment MqttAuthLogItemDataFragment on GQL_MqttAuthLog {
    code
    errorMessage
    id
    timeStamp
  }
`;

type MqttAuthLogItemProps = {
  dataRef: MqttAuthLogItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
}

export function MqttAuthLogItem({dataRef, onItemClick}:MqttAuthLogItemProps){

  const data = useFragment(MqttAuthLogItemDataFragment, dataRef);
  
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
  },[data]);

  
  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-3/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.code}
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
