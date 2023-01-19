import clsx from "clsx";
import React from "react";
import GraphiQL from "graphiql";
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { BASE_SERVER_URL, BASE_SERVER_WS_URL_DEV, GQL_PUBLIC_ENDPOINT } from "../../constants";

// import "@graphiql/react/font/roboto.css";
// import "@graphiql/react/font/fira-code.css";
import "graphiql/graphiql.css";


export default React.memo(ApiGraphql)

const fetcher = createGraphiQLFetcher({
  url: `${BASE_SERVER_URL}/${GQL_PUBLIC_ENDPOINT}`,
  subscriptionUrl: `${BASE_SERVER_WS_URL_DEV}/${GQL_PUBLIC_ENDPOINT}`,
  headers: {
    "Accept": "application/graphql-response+json;charset=utf-8, multipart/mixed;charset=utf-8",
    "Content-Type": "application/json",
    'X-CSRF': '1'
  },
});

const defaultQuery =
`# This is GraphQl Playground
#
# An example GraphQL:
#

query{
  servers{
    edges{
      node{
        name
        location
        state
      }
    }
  }
}

#
# Keyboard shortcuts:
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
`;

type ApiGraphqlProps = {

}

function ApiGraphql({}:ApiGraphqlProps) {

  return <div className={clsx("flex w-full h-128 2xl:h-160 rounded-lg",
    "overflow-hidden border-gray-100 shadow-sm")}>
    <GraphiQL
      defaultQuery={defaultQuery}
      defaultEditorToolsVisibility={false}
      fetcher={fetcher}
    />
    </div>
}