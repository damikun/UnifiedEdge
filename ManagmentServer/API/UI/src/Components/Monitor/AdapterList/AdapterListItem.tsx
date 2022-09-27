import clsx from "clsx";
import { useFragment } from "react-relay";
import { useNavigate } from "react-router";
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
    (e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>) => {

        PreventDefaults(e);

        data?.id && startTransition(() => {
          navigate(`/Monitor/Adapter/${data.id}`)
        });
    },
    [data, navigate],
  )

  return <tbody onClick={handleClick} key={key_}
    className={clsx("flex space-y-1 space-x-2",
    "text-center cursor-pointer justify-between py-1 hover:bg-gray-200",
    "rounded-sm hover:shadow-sm px-2 md:px-5")}>
    <tr className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <td className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </td>
    </tr>
    <tr className={clsx("w-3/12 2xl:w-2/12 flex truncate text-gray-500",
      "justify-center text-center font-mono font-semibold text-sm hidden md:flex")}>
      <td className="truncate">
        {data?.interfaceType}
      </td>
    </tr>
    <tr className="w-3/12 2xl:w-2/12 flex justify-center text-center">
      <td>
        <AdapterStateBadget state={data?.state}/>
      </td>
    </tr>
  </tbody>
}

function PreventDefaults(e:any) {
  e.preventDefault();
  e.stopPropagation();
}
