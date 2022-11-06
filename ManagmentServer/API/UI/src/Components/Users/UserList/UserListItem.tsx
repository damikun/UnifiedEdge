import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import TableItem from "../../Table/TableItem";
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
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

        PreventDefaults(e);
        
        data?.id && startTransition(() => {
          navigate(`/Users/User/${data.id}`)
        });
    },
    [data, navigate],
  )

  return <TableItem onClick={handleClick} key={key_}>
    <td className="flex w-3/12">
      <div className={clsx("truncate break-all font-sans text-gray-700",
      "font-semibold text-sm capitalize")}>
        {data?.userName}
      </div>
    </td>
    <td className="w-3/12 hidden lg:flex">
      <div className="truncate font-normal text-gray-600">
        {data?.firstName}
      </div>
    </td>
    <td className="w-3/12 hidden lg:flex">
      <div className="truncate font-normal text-gray-600">
        {data?.lastName}
      </div>
    </td>
    <td className="flex w-3/12 justify-center items-center">
      <div className="flex">
        <Badge
          variant={data?.enabled?"primarygreen":"primaryred"}
          >
          {data?.enabled?"Enabled":"Disabled"}
        </Badge>
      </div>
    </td>
  </TableItem>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
