import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import Badge from "../../../UIComponents/Badged/Badge";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../UIComponents/Table/TableItem";
import { WebHookRecordItemDataFragment$key } from "./__generated__/WebHookRecordItemDataFragment.graphql";


const WebHookRecordItemDataFragment = graphql`
  fragment WebHookRecordItemDataFragment on GQL_WebHookRecord {
    id
    result
    hookEventGroup
    guid
    timestamp
    statusCode
  }
`;

type WebHookRecordItemProps = {
  dataRef: WebHookRecordItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function WebHookRecordItem({dataRef, onItemClick,key_}:WebHookRecordItemProps){

  const data = useFragment(WebHookRecordItemDataFragment, dataRef);
  
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
    return GetLocalDate(data?.timestamp);
  },[data]) 

  return <TableItem height="h-14" onClick={handleClick} key={key_}>
    <td className="w-20 flex items-center justify-center">
      <StateSection state={data?.result} />
    </td>
    <td className="flex-1 flex-col justify-start hidden lg:flex">
      <div
        className={clsx(
          "flex py-0.5 truncate-1-lines",
          "break-all rounded-md font-semibold",
          "whitespace-pre capitalize text-sm"
        )}
      >
        {data?.hookEventGroup}
      </div>

      <div className="flex text-xs font-semibold text-gray-500">
        {data?.guid}
      </div>
    </td>
    <td className="flex lg:flex items-center truncate my-auto">
      {dt}
    </td>
    <td className="flex w-24 md:w-28 items-center text-center justify-center ">
      <StatusCodeSection status={data?.statusCode} />
    </td>

  </TableItem>
}


///////////////////////////////////////////
///////////////////////////////////////////


type StateSectionProps = {
  state: string | null | undefined;
};

function StateSection({ state }: StateSectionProps) {
  if (!state) {
    return <></>;
  }

  const varinat = state === "OK" ? "secondarygreen" : "secondaryellow";

  return (
    <div className="max-w-16">
      <Badge
        turncate
        border={false}
        className="text-xxs"
        size="thin"
        variant={varinat}
      >
        {state}
      </Badge>
    </div>
  );
}

///////////////////////////////////////////
///////////////////////////////////////////

type StatusCodeSectionProps = {
  status: number | null | undefined;
};

export function StatusCodeSection({ status }: StatusCodeSectionProps) {
  const status_style = useMemo(() => {
    if (status) {
      if (status >= 200 && status <= 299) {
        return "text-white bg-green-400";
      } else {
        return "text-white bg-red-400";
      }
    } else {
      return "bg-gray-200 text-gray-700";
    }
  }, []);

  if (!status) {
    return <></>;
  }

  return (
    <div
      className={clsx(
        "px-1.5 py-0.5 flex leading-none truncate-1-lines",
        "break-all rounded-md font-semibold text-xs w-10 text-center justify-center",
        status_style
      )}
    >
      {status}
    </div>
  );
}
