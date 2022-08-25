import clsx from "clsx";
import { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../UIComponents/Badged/Badge";
import { useFragment, usePaginationFragment } from "react-relay";
import {GetMqttServerStateBadgetVariant} from "../../Shared/Common";
import { ServerListRefetchQuery } from "./__generated__/ServerListRefetchQuery.graphql";
import { ServerListDataFragment$key } from "./__generated__/ServerListDataFragment.graphql";
import { ServerListItemDataFragment$key } from "./__generated__/ServerListItemDataFragment.graphql";

export const ServerListDataFragment = graphql`
  fragment ServerListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int }
    after: { type: String }
  ) @refetchable(queryName: "ServerListRefetchQuery") {
    mqttServers(
      first: $first
      after: $after
    ) @connection(key: "ServerListConnection_mqttServers"){
      __id
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          ...ServerListItemDataFragment
        }
      }
    }
  }
`;

type ServerListProps = {
    dataRef:ServerListDataFragment$key;
};

export default function ServerList({dataRef}:ServerListProps){

    const page_data = usePaginationFragment<
    ServerListRefetchQuery,
    ServerListDataFragment$key
  >(ServerListDataFragment, dataRef);

    return <table className={clsx("flex bg-gray-100 flex-col w-full border border-gray-200 ",
        " rounded-sm shadow-sm pt-2")}>
        <ServerListHeader/>
        {page_data?.data?.mqttServers?.edges?.map((entity) => {
            return entity ? (
                <ServerListItems key={entity.node?.id} dataRef={entity.node}/>
            ) : (
                <></>
            );
        })}
    </table> 
}

const ServerListItemDataFragment = graphql`
    fragment ServerListItemDataFragment on GQL_MqttServer {
        id
        isRunning
        name
        state
        port
    }
`;

type ServerListItemsProps = {
    dataRef:ServerListItemDataFragment$key | null;
    key_?:string
}

function ServerListItems({dataRef,key_}:ServerListItemsProps){

    const data = useFragment(ServerListItemDataFragment, dataRef);

    const state_variant = useMemo(
      () => {
        return GetMqttServerStateBadgetVariant(data?.state)
      },
      [data?.state],
    )
    
    return <tbody key={key_} className={clsx("flex space-y-1 space-x-2 text-center cursor-pointer",
        "justify-between py-1 hover:bg-gray-200 rounded-sm hover:shadow-sm px-2 md:px-5")}>
        <tr className="w-6/12 2xl:w-8/12 flex truncate capitalize">
          <td>
            {data?.name}
          </td>
        </tr>
        <tr className="w-3/12 2xl:w-2/12 flex truncate justify-center text-center font-mono">
          <td>
            {data?.port}
          </td>
        </tr>
        <tr className="w-3/12 2xl:w-2/12 flex justify-center text-center">
          <td>
            <Badge
                turncate
                border={false}
                className="text-xxs"
                size="thin"
                variant={state_variant}
            >
                {data?.state}
            </Badge>
          </td>
        </tr>
    </tbody>
}


type ServerListHeaderProps = {

}

function ServerListHeader({}:ServerListHeaderProps){

  return <thead className={clsx("flex text-gray-600 w-full space-x-2 justify-between",
      "border-b border-gray-200 py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none")}>
      <tr className="flex w-6/12 2xl:w-8/12">
        <th>Name</th>
      </tr>
      <tr className="flex w-3/12 2xl:w-2/12 text-center justify-center">
        <th>Port</th>
      </tr>
      <tr className="flex w-3/12 2xl:w-2/12 text-center justify-center">
        <th>State</th>
      </tr>
  </thead>
}