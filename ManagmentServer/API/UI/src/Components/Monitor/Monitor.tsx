import React from "react";
import EdgeInfo from "./EdgeInfo";
import ServerList from "./ServerList";
import EdgeMetrics from "./EdgeMetrics";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../UIComponents/Section/Section";
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

function Monitor(){
        
  const data = useLazyLoadQuery<MonitorQuery>(
    MonitorQueryTag,
    { },
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy:"partial"
    },
  );

    return <>
        <Section name="Edge" component={<EdgeInfo dataRef={data} />}/>
        <Section name="Mqtt servers" component={<ServerList dataRef={data} />}/>
        <Section name="Edge metrics" component={<EdgeMetrics dataRef={data} />}/>

        <div className="flex h-80 bg-red-200">dsdsddsd</div>
        <div className="flex h-80 bg-blue-200">dsdsddsd</div>
        <div className="flex h-80 bg-pink-200">dsdsddsd</div>
        <div className="flex h-80 bg-gray-200">dsdsddsd</div>
    </>
}