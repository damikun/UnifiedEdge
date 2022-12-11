import React, { useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import MqttLogsView from "./Logs/MqttLogsView";
import ServerInfo from "../ServerInfo/ServerInfo";
import MqttServerInfo from "./Info/MqttServerInfo";
import { graphql } from "babel-plugin-relay/macro";
import MqttServerAuth from "./Auth/MqttServerAuth";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import MqttServerSettings from "./Settings/MqttServerSettings";
import StyledTabSection from "../../../Shared/StyledTabSection";
import { MqttServerQuery } from "./__generated__/MqttServerQuery.graphql";
import { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";


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

  return <>
    <Section 
      name={"Server"}
      component={<ServerInfo dataRef={data.mqttServerById}/>}
    />

    <StyledTabSection tabs={SettingsTabs}/>

    <Routes>
      <Route path="/Settings/" element={<MqttServerSettings/>} />
      <Route path="/Logs/" element={<MqttLogsView/>} />
      <Route path="/Auth/" element={<MqttServerAuth/>} />
      <Route path="/Explore/" element={<Dummy/>} />
      <Route path="/*" element={<MqttServerInfo/>} />
    </Routes>

  </>
}

function Dummy(){
  return <>
    <div className="flex h-80 bg-blue-200">dsdsddsd</div>
    <div className="flex h-80 bg-red-200">dsdsddsd</div>
    <div className="flex h-80 bg-pink-200">dsdsddsd</div>
    <div className="flex h-80 bg-gray-200">dsdsddsd</div>
    </>
  }
  