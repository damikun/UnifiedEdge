import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import Badge from "../../../UIComponents/Badged/Badge";
import { UserListItemDataFragment$key } from "./__generated__/UserListItemDataFragment.graphql";


const UserListItemDataFragment = graphql`
  fragment UserListItemDataFragment on GQL_User {
    id
    firstName
    lastName
    sessionId
    userName
    enabled
  }
`;

type UserListItemProps = {
  dataRef:UserListItemDataFragment$key | null;
  key_?:string
}

export function UserListItem({dataRef, key_}:UserListItemProps){

  const data = useFragment(UserListItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const navigate = useNavigate();
  
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {

        PreventDefaults(e);
        
        data?.id && startTransition(() => {
          navigate(`/Users/User/${data.id}`)
        });
    },
    [data, navigate],
  )

  return <tbody onClick={handleClick} key={key_} className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer py-2 hover:bg-gray-200 hover:bg-opacity-40",
    "rounded-sm hover:shadow-sm px-2 md:px-5 justify-between lg:justify-start")}>
    <tr className="flex w-3/12 items-center">
      <td className={clsx("truncate break-all font-sans text-gray-700",
      "font-semibold text-sm capitalize")}>
        {data?.userName}
      </td>
    </tr>
    <tr className="w-6/12 2xl:w-7/12 hidden lg:flex items-center">
      <td className="truncate font-normal text-gray-600">
        {data?.firstName}
      </td>
    </tr>
    <tr className="w-6/12 2xl:w-7/12 hidden lg:flex items-center">
      <td className="truncate font-normal text-gray-600">
        {data?.lastName}
      </td>
    </tr>
    <tr className="flex w-3/12 2xl:w-2/12 justify-start items-center">
      <td className="flex max-w-full break-all">
        <Badge
          variant={data?.enabled?"secondarygreen":"primaryred"}
          >
          {data?.enabled?"Enabled":"Disabled"}
        </Badge>
      </td>
    </tr>
  </tbody>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
