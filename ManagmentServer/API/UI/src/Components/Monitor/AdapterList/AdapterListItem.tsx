import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
import TableItem from "../../Table/TableItem";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import { AdapterStateBadget } from "../../Adapter/AdapterState";
import { AdapterListItemDataFragment$key  } from "./__generated__/AdapterListItemDataFragment.graphql";


const AdapterListItemDataFragment = graphql`
  fragment AdapterListItemDataFragment on GQL_Adapter {
    id
    interfaceType
    name
    state
  }
`;

type AdapterListItemProps = {
  dataRef:AdapterListItemDataFragment$key | null;
  key_?:string
}

export function AdapterListItem({dataRef, key_}:AdapterListItemProps){

  const data = useFragment(AdapterListItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const navigate = useNavigate();
  
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {

        PreventDefaults(e);

        data?.id && startTransition(() => {
          navigate(`/Monitor/Adapter/${data.id}`)
        });
    },
    [data, navigate],
  )

  return <TableItem onClick={handleClick} key={key_}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </div>
    </td>
    <td className={clsx("w-3/12 2xl:w-2/12 flex truncate text-gray-500",
      "justify-center text-center font-mono font-semibold text-sm hidden md:flex")}>
      <div className="truncate">
        {data?.interfaceType}
      </div>
    </td>
    <td className="w-3/12 2xl:w-2/12 flex justify-center text-center">
      <div>
        <AdapterStateBadget state={data?.state}/>
      </div>
    </td>
  </TableItem>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
