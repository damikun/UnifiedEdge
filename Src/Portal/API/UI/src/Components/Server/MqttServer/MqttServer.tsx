import React, { lazy, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import ServerInfo from "../ServerInfo/ServerInfo";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../../Layout/PageContainer";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import StyledTabSection from "../../../Shared/StyledTabSection";
import { MqttServerQuery } from "./__generated__/MqttServerQuery.graphql";
import { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";


const MqttServerAuth = lazy(
  () =>
    import(
      /* webpackChunkName: "MqttServerAuth" */ "./Auth/MqttServerAuth"
    )
);

const MqttServerInfo = lazy(
  () =>
    import(
      /* webpackChunkName: "MqttServerInfo" */ "./Info/MqttServerInfo"
    )
);

const MqttLogsView = lazy(
  () =>
    import(
      /* webpackChunkName: "MqttLogsView" */ "./Logs/MqttLogsView"
    )
);

const MqttServerExplorer = lazy(
  () =>
    import(
      /* webpackChunkName: "MqttServerExplorer" */ "./Explorer/MqttServerExplorer"
    )
);

const MqttServerSettings = lazy(
  () =>
    import(
      /* webpackChunkName: "MqttServerSettings" */ "./Settings/MqttServerSettings"
    )
);


export const SettingsTabs = [
  {
    label: "Info",
    path: ``,
  },
  {
    label: "Settings",
    path: `Settings`,
  },
  {
    label: "Logs",
    path: `Logs`,
  },
  {
    label: "Auth",
    path: `Auth`,
  },
  {
    label: "Explorer",
    path: `Explore`,
  },
] as RouterTabItemType[];

const MqttServerQueryTag = graphql`
  query MqttServerQuery($id:ID!){
    mqttServerById(id:$id){
      name
      ...ServerInfoDataFragment
    }
  }
`;

export default React.memo(MqttServer)

function MqttServer() {

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const data = useLazyLoadQuery<MqttServerQuery>(
    MqttServerQueryTag,
    {id:server_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <PageContainer fullHeight reservefooterSpace>

    <Section 
      name={"Server"}
      component={<ServerInfo dataRef={data.mqttServerById}/>}
    />

    <StyledTabSection tabs={SettingsTabs}/>
 
    <Routes>
      <Route path="/Settings/" element={<MqttServerSettings/>} />
      <Route path="/Logs/" element={<MqttLogsView/>} />
      <Route path="/Auth/" element={<MqttServerAuth/>} />
      <Route path="/Explore/" element={<MqttServerExplorer/>} />
      <Route path="/*" element={<MqttServerInfo/>} />
    </Routes>

  </PageContainer>
}

