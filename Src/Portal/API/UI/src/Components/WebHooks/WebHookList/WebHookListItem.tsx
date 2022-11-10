import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../UIComponents/Table/TableItem";
import { WebHookListItemDataFragment$key } from "./__generated__/WebHookListItemDataFragment.graphql";


const WebHookListItemDataFragment = graphql`
  fragment WebHookListItemDataFragment on GQL_WebHook {
      id
      name
      contentType
      eventGroup
      isActive
      lastTrigger
      secret
      webHookUrl
      serverUid
  }
`;

type WebHookListItemProps = {
  dataRef:WebHookListItemDataFragment$key | null;
  key_?:string
}

export function WebHookListItem({dataRef, key_}:WebHookListItemProps){

  const data = useFragment(WebHookListItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const navigate = useNavigate();
  
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

        PreventDefaults(e);
        
        data?.id && startTransition(() => {
          navigate(`/WebHooks/Hook/${data.id}`)
        });
    },
    [data, navigate],
  )

  const dt = useMemo(() => {
    return data?.lastTrigger?
    new Date(data.lastTrigger).toLocaleString()?? "N/A" :
    "N/A"
  }, [data?.lastTrigger])

  return <TableItem height="h-12" onClick={handleClick} key={key_}>
    <td className="flex w-3/12 items-center">
      <div className={clsx("truncate break-all font-sans text-gray-700",
      "font-semibold text-sm capitalize")}>
        {data?.name}
      </div>
    </td>
    <td className="w-6/12 2xl:w-7/12 hidden lg:flex items-center">
      <div className="truncate font-normal text-gray-600">
        {data?.webHookUrl}
      </div>
    </td>
    <td className="flex w-3/12 2xl:w-2/12 justify-start items-center">
      <div className="flex max-w-full break-all">
        <div className="truncate">
          {dt}
        </div>
      </div>
    </td>
  </TableItem>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
