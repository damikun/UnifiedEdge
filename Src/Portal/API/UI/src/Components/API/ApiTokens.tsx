import React from "react";
import TokenList from "./TokenList/TokenList";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import TokenListBar from "./TokenList/TokenListBar";
import Section from "../../UIComponents/Section/Section";
import { ApiTokensQuery } from "./__generated__/ApiTokensQuery.graphql";
import { TokenListCtxProvider } from "./TokenList/TokenListCtxProvider";


export default React.memo(ApiTokens)

const ApiTokensTag = graphql`
    query ApiTokensQuery {
        ...TokenListDataFragment
    }
`;

type ApiTokensProps = {

}

function ApiTokens({}:ApiTokensProps) {

  const data = useLazyLoadQuery<ApiTokensQuery>(
    ApiTokensTag,
    {},
    {
        fetchPolicy: "store-and-network",
        UNSTABLE_renderPolicy: "partial"
    },
);

  return <>
    <TokenListCtxProvider>
      <Section 
        name="API Tokens"
        bar={<TokenListBar/>}
        component={<TokenList dataRef={data} />}
      />
    </TokenListCtxProvider>
  </>
}