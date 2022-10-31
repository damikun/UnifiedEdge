import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useTransition } from "react";
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
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {

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

  return <tbody onClick={handleClick} key={key_} className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer py-2 hover:bg-gray-200 hover:bg-opacity-40",
    "rounded-sm hover:shadow-sm px-2 md:px-5 justify-between lg:justify-start")}>
    <tr className="flex w-3/12 items-center">
      <td className={clsx("truncate break-all font-sans text-gray-700",
      "font-semibold text-sm capitalize")}>
        {data?.name}
      </td>
    </tr>
    <tr className="w-6/12 2xl:w-7/12 hidden lg:flex items-center">
      <td className="truncate font-normal text-gray-600">
        {data?.webHookUrl}
      </td>
    </tr>
    <tr className="flex w-3/12 2xl:w-2/12 justify-start items-center">
      <td className="flex max-w-full break-all">
        <div className="truncate">
          {dt}
        </div>
      </td>
    </tr>
  </tbody>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
