import React from "react";
import { useLazyLoadQuery } from "react-relay";
import ServerLogs from "../ServerLogs/ServerLogs";
import ServerInfo from "../ServerInfo/ServerInfo";
import MqttServerInfo from "./Info/MqttServerInfo";
import { graphql } from "babel-plugin-relay/macro";
import MqttServerSettings from "./Settings/MqttServerSettings";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import { MqttServerQuery } from "./__generated__/MqttServerQuery.graphql";
import RouterTabList, { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";


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

  const data = useLazyLoadQuery<MqttServerQuery>(
    MqttServerQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name={data.mqttServerById.name}
      component={<ServerInfo dataRef={data.mqttServerById}/>}
    />

    <TabSection/>

    <Routes>
      <Route path="/Settings/" element={<MqttServerSettings/>} />
      <Route path="/Logs/" element={<ServerLogs/>} />
      <Route path="/Explore/" element={<Dummy/>} />
      <Route path="/*" element={<MqttServerInfo/>} />
    </Routes>

  </>
}

function TabSection() {
  return <div className="flex sticky top-16 bg-gray-100 shadow-sm w-full">
    <RouterTabList
      hoverEffect
      tabStyle={"h-11 hover:bg-transparent"}
      flexVariant="row"
      defaultIndex={0}
      Tabs={SettingsTabs} />
  </div>;
}

function Dummy(){
  return <>
    <div className="flex h-80 bg-blue-200">dsdsddsd</div>
    <div className="flex h-80 bg-red-200">dsdsddsd</div>
    <div className="flex h-80 bg-pink-200">dsdsddsd</div>
    <div className="flex h-80 bg-gray-200">dsdsddsd</div>
    </>
  }
  