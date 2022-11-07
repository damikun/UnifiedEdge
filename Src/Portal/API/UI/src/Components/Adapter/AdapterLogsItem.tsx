import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../Shared/Common";
import React, { useCallback, useMemo } from "react";
import { AdapterStateBadget } from "./AdapterState";
import TableItem from "../../UIComponents/Table/TableItem";
import { AdapterLogsItemDataFragment$key, AdapterState } from "./__generated__/AdapterLogsItemDataFragment.graphql";


export const AdapterLogsItemDataFragment = graphql`
  fragment AdapterLogsItemDataFragment on GQL_AdapterLog
  {
    id
    timeStamp
    state
  }
`;

export default React.memo(AdapterLogsItem)

type AdapterLogsItemProps = {
  dataRef:AdapterLogsItemDataFragment$key | null;
}

function AdapterLogsItem({dataRef}:AdapterLogsItemProps) {

  const data = useFragment(AdapterLogsItemDataFragment, dataRef);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

    },
    [],
  )

  const dt = useMemo(()=>{
    return GetLocalDate(data?.timeStamp);
},[data]) 

  const memorisedNameStr = useMemo(() => {
    return GetNameString(data?.state)
  }, [data]);

  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {memorisedNameStr}
      </div>
    </td>
    <td className={clsx("w-1/12 2xl:w-2/12 flex truncate text-gray-500",
      "justify-center text-center font-mono font-semibold text-sm hidden md:flex")}>
      <div className="truncate">
        <AdapterStateBadget state={data?.state}/>
      </div>
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex truncate",
      "justify-center text-center text-sm")}>
      <div className="truncate">
        {dt}
      </div>
    </td>
</TableItem>
}


function GetNameString(state: AdapterState | undefined){
  switch (state) {
    case "UNKNOWN":
      return "Unknown state"
    case "UP":
      return "Switched On"
    case "DOWN":
      return "Switched Off"
    default:
      break;
  }
}
