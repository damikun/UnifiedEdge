import React from "react";
import EdgeInfo from "./EdgeInfo";
import ServerList from "./ServerList";
import EdgeMetrics from "./EdgeMetrics";
import ServerListBar from "./ServerListBar";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../UIComponents/Section/Section";
import { ServerListCtxProvider } from "./ServerListCtxProvider";
import { MonitorQuery } from "./__generated__/MonitorQuery.graphql";

const MonitorQueryTag = graphql`
  query MonitorQuery {
    ...EdgeInfoDataFragment
    ...ServerListDataFragment
    ...ResourcesDataFragment
    ...EdgeMetricsFragment
  }
`;

export default React.memo(Monitor)

function Monitor() {

  const data = useLazyLoadQuery<MonitorQuery>(
    MonitorQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name="Edge"
      component={<EdgeInfo dataRef={data} />}
    />

    <ServerListCtxProvider>
      <Section 
        name="Servers"
        bar={<ServerListBar/>}
        component={<ServerList dataRef={data} />}
      />
    </ServerListCtxProvider>

    <Section 
      name="Instance"
      component={<EdgeMetrics dataRef={data} />}
    />
  </>
}