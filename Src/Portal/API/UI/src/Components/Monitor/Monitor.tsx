import EdgeInfo from "./EdgeInfo";
import React, { Suspense } from "react";
import EdgeMetrics from "./EdgeMetrics";
import { useLazyLoadQuery } from "react-relay";
import ServerList from "./ServerList/ServerList";
import { graphql } from "babel-plugin-relay/macro";
import AdapterList from "./AdapterList/AdapterList";
import PageContainer from "../Layout/PageContainer";
import ServerListBar from "./ServerList/ServerListBar";
import Section from "../../UIComponents/Section/Section";
import AdapterListBar from "./AdapterList/AdapterListBar";
import { MonitorQuery } from "./__generated__/MonitorQuery.graphql";
import { ServerListCtxProvider } from "./ServerList/ServerListCtxProvider";
import { AdapterListCtxProvider } from "./AdapterList/AdapterListCtxProvider";



const MonitorQueryTag = graphql`
  query MonitorQuery {
    ...EdgeInfoDataFragment
    ...AdapterListDataFragment
    ...ServerListDataFragment
    ...ResourcesDataFragment@defer
    ...EdgeMetricsFragment@defer
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

  return <PageContainer>
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

    <AdapterListCtxProvider>
      <Section 
        name="Adapters"
        bar={<AdapterListBar/>}
        component={<AdapterList dataRef={data} />}
      />
    </AdapterListCtxProvider>

    <Suspense fallback={null}>
      <Section 
        name="Instance"
        component={<EdgeMetrics dataRef={data} />}
      />
    </Suspense>

  </PageContainer>
}