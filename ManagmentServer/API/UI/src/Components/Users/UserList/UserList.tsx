import { useEffect } from "react";
import Table from "../../../UIComponents/Table/Table";
import TableBody from "../../../UIComponents/Table/TableBody";
import { UserListItem } from "./UserListItem";
import TableHeader from "../../../UIComponents/Table/TableHeader";
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

  return <Table>
    <UserListHeader/>
    <TableBody>
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
    </TableBody>
  </Table> 
}

// -------------------------------

type UserListHeaderProps = {

}

function UserListHeader({}:UserListHeaderProps){

  return <TableHeader>
    <tr className="flex w-3/12">
      <th>UserName</th>
    </tr>
    <tr className="w-3/12 hidden lg:flex">
      <th>FirstName</th>
    </tr>
    <tr className="w-3/12 hidden lg:flex">
      <th>LastName</th>
    </tr>
    <tr className="flex w-3/12 justify-center items-center text-center">
      <th>Enabled</th>
    </tr>
  </TableHeader>
} 