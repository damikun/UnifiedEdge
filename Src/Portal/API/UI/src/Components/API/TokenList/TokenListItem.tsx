import clsx from "clsx";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import TableItem from "../../../UIComponents/Table/TableItem";
import { TokenListItemDataFragment$key } from "./__generated__/TokenListItemDataFragment.graphql";


const TokenListItemDataFragment = graphql`
  fragment TokenListItemDataFragment on GQL_Token {
    id
    description
    expiration
  }
`;

type TokenListItemProps = {
  dataRef:TokenListItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
}

export function TokenListItem({dataRef,onItemClick}:TokenListItemProps){

  const data = useFragment(TokenListItemDataFragment, dataRef);
  
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

  const dt = useMemo(() => {
    return GetLocalDate(data?.expiration);
  }
  , [data])

  
  return <TableItem onClick={handleClick}>
    <td className="flex w-7/12 2xl:w-9/12">
      <div className={clsx("truncate break-all font-sans text-gray-700",
      "font-semibold text-sm capitalize")}>
        {data?.description}
      </div>
    </td>
    <td className="flex w-5/12 2xl:w-3/12 justify-center items-center">
      {dt}
    </td>
  </TableItem>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
