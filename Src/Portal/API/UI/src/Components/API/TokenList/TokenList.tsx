import { useEffect } from "react";
import { TokenListItem } from "./TokenListItem";
import TokenItemDetail from "./TokenItemDetail";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Table from "../../../UIComponents/Table/Table";
import Modal from "../../../UIComponents/Modal/Modal";
import { useTokenListCtx } from "./TokenListCtxProvider";
import TableBody from "../../../UIComponents/Table/TableBody";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import { useSearchParamHandler } from "../../../Hooks/useHandleSearchParam";
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

  const [isOpen, open, close] = useSearchParamHandler(TOKEN_PARAM_NAME);
  
  return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={close}
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
              onItemClick={open}
            />
          })
      }
      </TableBody>
    </Table> 
  </>
}

// -------------------------------

function TokenListHeader(){

  return <TableHeader>
    <tr className="flex w-7/12 2xl:w-9/12">
      <th>Description</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-3/12 justify-center items-center text-center">
      <th>Expiration</th>
    </tr>
  </TableHeader>
} 