import clsx from "clsx";
import { useEffect } from "react";
import { UserListItem } from "./UserListItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { useUserListCtx } from "./UserListCtxProvider";
import { UserListRefetchQuery } from "./__generated__/UserListRefetchQuery.graphql";
import { UserListDataFragment$key } from "./__generated__/UserListDataFragment.graphql";


export const UserListDataFragment = graphql`
  fragment UserListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int, defaultValue: 100 }
    after: { type: String }
  ) @refetchable(queryName: "UserListRefetchQuery") {
    users(
      first: $first   
      after: $after
    ) @connection(key: "UserListConnection_users"){
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
          ...UserListItemDataFragment
        }
      }
    }
  }
`;

// -------------------------------

type UserListProps = {
  dataRef:UserListDataFragment$key;
};

export default function UserList({dataRef}:UserListProps){

  const page_data = usePaginationFragment<
    UserListRefetchQuery,
    UserListDataFragment$key
  >(UserListDataFragment, dataRef);

  const context = useUserListCtx();

  useEffect(() => {
    page_data?.data.users?.__id && context.setId(page_data?.data.users?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_data?.data.users?.__id])

  return <table className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2")}>
    <UserListHeader/>
    {
      page_data?.data?.users?.edges
        ?.filter(e=>e !== null && e !== undefined)
        .map((entity) => {
          return <UserListItem 
            key={entity.node?.id}
            dataRef={entity.node}
          />
        })
    }
  </table> 
}

// -------------------------------

type UserListHeaderProps = {

}

function UserListHeader({}:UserListHeaderProps){

  return <thead className={clsx("flex text-gray-600 w-full",
    "space-x-2 border-b justify-between lg:justify-start border-gray-200",
    "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none")}>
    <tr className="flex w-3/12">
      <th>UserName</th>
    </tr>
    <tr className="w-3/12 hidden lg:flex">
      <th>FirstName</th>
    </tr>
    <tr className="w-3/12 hidden lg:flex">
      <th>LastName</th>
    </tr>
    <tr className="w-3/12 justify-start">
      <th>Enabled</th>
    </tr>
  </thead>
} 