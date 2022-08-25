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

export default function Monitor(){
        
  const data = useLazyLoadQuery<MonitorQuery>(
    MonitorQueryTag,
    { },
    { fetchPolicy: "store-and-network", UNSTABLE_renderPolicy:"full"},
  );

    return <>
        <Section name="Edge" component={<EdgeInfo dataRef={data} />}/>
        <Section name="Servers" component={<ServerList dataRef={data} />}/>
        <Section name="Metrics" component={<EdgeMetrics dataRef={data} />}/>

        <div className="flex h-80 bg-red-200">dsdsddsd</div>
        <div className="flex h-80 bg-blue-200">dsdsddsd</div>
        <div className="flex h-80 bg-pink-200">dsdsddsd</div>
        <div className="flex h-80 bg-gray-200">dsdsddsd</div>
    </>
}