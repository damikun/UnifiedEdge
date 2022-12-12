import React, { useEffect } from "react";
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { PlusIcon, ToolbarMenu, useEditorContext } from "@graphiql/react";
import { BASE_SERVER_URL, GQL_ENDPOINT } from "../../constants";
import GraphiQL, { GraphiQLInterface, GraphiQLProvider } from "graphiql";

import "@graphiql/react/font/roboto.css";
import "@graphiql/react/font/fira-code.css";
import "graphiql/graphiql.css";

export default React.memo(ApiGraphql)

const fetcher = createGraphiQLFetcher({
  url: `${BASE_SERVER_URL}/${GQL_ENDPOINT}`,
});

type ApiGraphqlProps = {

}

function ApiGraphql({}:ApiGraphqlProps) {

  
const API_LIST = [
  {
    name: "swapi",
    url: "https://swapi-graphql.netlify.app/.netlify/functions/index"
  },
  {
    name: "spacex",
    url: "https://api.spacex.land/graphql"
  }
];

function GraphiQLWithContext() {
  const editorContext = useEditorContext();
  const responseEditor = editorContext?.responseEditor;
  useEffect(() => {
    if (!responseEditor) return;

    function onChange(editor: any) {
      const value = editor.getValue();

      editor.setValue(value);
    }
    responseEditor.on("change", onChange);
    return () => responseEditor.off("change", onChange);
  }, [responseEditor]);
  return <GraphiQLInterface />;
}

  return <div className="flex w-full h-screen rounded-md overflow-hidden border-gray-100 shadow-sm">

    <GraphiQL
      fetcher={fetcher}
      toolbar={{
        additionalContent: (
          <ToolbarMenu
            button={<PlusIcon className="graphiql-toolbar-icon" />}
            label={"SomeName"}
          >
            {API_LIST.map(({ name, url }) => (
              <ToolbarMenu.Item
                onSelect={() =>
                 null
                }
              >
                {name}
              </ToolbarMenu.Item>
            ))}
          </ToolbarMenu>
        )
      }}
    />
    </div>
}