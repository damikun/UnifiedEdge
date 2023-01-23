import { TokenListItem } from "./TokenListItem";
import TokenItemDetail from "./TokenItemDetail";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Table from "../../../UIComponents/Table/Table";
import Modal from "../../../UIComponents/Modal/Modal";
import { useCallback, useEffect, useMemo } from "react";
import { useTokenListCtx } from "./TokenListCtxProvider";
import TableBody from "../../../UIComponents/Table/TableBody";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import { TokenListRefetchQuery } from "./__generated__/TokenListRefetchQuery.graphql";
import { TokenListDataFragment$key } from "./__generated__/TokenListDataFragment.graphql";


export const TokenListDataFragment = graphql`
  fragment TokenListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int, defaultValue: 100 }
    after: { type: String }
  ) @refetchable(queryName: "TokenListRefetchQuery") {
    apiTokens(
      first: $first   
      after: $after
    ) @connection(key: "TokenListConnection_apiTokens"){
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
          ...TokenListItemDataFragment
        }
      }
    }
  }
`;

// -------------------------------

type TokenListProps = {
  dataRef:TokenListDataFragment$key;
};

export const TOKEN_PARAM_NAME = "token_id"

export default function TokenList({dataRef}:TokenListProps){

  const page_data = usePaginationFragment<
    TokenListRefetchQuery,
    TokenListDataFragment$key
  >(TokenListDataFragment, dataRef);

  const context = useTokenListCtx();

  useEffect(() => {
    page_data?.data.apiTokens?.__id && context.setId(page_data?.data.apiTokens?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_data?.data.apiTokens?.__id])

  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleItemDetail = useCallback(
    (client_id: string | null | undefined) => {
      searchParams.delete(TOKEN_PARAM_NAME);
      if (client_id) {
        searchParams.append(TOKEN_PARAM_NAME, client_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  
  const isOpen = useMemo(() => 
  searchParams.get(TOKEN_PARAM_NAME)!== null, [searchParams]
);

const handleModalClose = useCallback(() => {
  searchParams.delete(TOKEN_PARAM_NAME);
  setSearchParams(searchParams);
}, [searchParams, setSearchParams]);


  return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <TokenItemDetail />
      }
    />
    
    <Table>
      <TokenListHeader/>
      <TableBody>
      {
        page_data?.data?.apiTokens?.edges
          ?.filter(e=>e !== null && e !== undefined)
          .map((entity) => {
            return <TokenListItem 
              key={entity.node?.id}
              dataRef={entity.node}
              onItemClick={handleItemDetail}
            />
          })
      }
      </TableBody>
    </Table> 
  </>
}

// -------------------------------

type TokenListHeaderProps = {

}

function TokenListHeader({}:TokenListHeaderProps){

  return <TableHeader>
    <tr className="flex w-7/12 2xl:w-9/12">
      <th>Description</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-3/12 justify-center items-center text-center">
      <th>Expiration</th>
    </tr>
  </TableHeader>
} 