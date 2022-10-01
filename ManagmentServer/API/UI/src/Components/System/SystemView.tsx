import React from "react";
import SystemLogs from "./SystemLogs";
import EdgeInfo from "../Monitor/EdgeInfo";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import SystemSettings from "./Settings/SystemSettings";
import Section from "../../UIComponents/Section/Section";
import { SystemViewQuery } from "./__generated__/SystemViewQuery.graphql";
import { Route, Routes, useMatch, useParams, useResolvedPath } from "react-router";
import RouterTabList, { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";


export const SettingsTabs = [
  {
    label: "Settings",
    path: ``,
  },
  {
    label: "Logs",
    path: `Logs`,
  },
  {
    label: "Scheduler",
    path: `Scheduler`,
  },
] as RouterTabItemType[];

const SystemViewQueryTag = graphql`
  query SystemViewQuery{
    edgeInfo {
      name
    }
    ...EdgeInfoDataFragment
    ...SystemSettingsDataFragment
  }
`;

export default React.memo(SystemView)

function SystemView() {

  const { id }: any = useParams<string>();

  const resolved_path = useResolvedPath("/Logs/");

  const match = useMatch("/Logs/");

  const data = useLazyLoadQuery<SystemViewQuery>(
    SystemViewQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name={"Edge"}
      component={<EdgeInfo dataRef={data} />}
    />

    <TabSection/>

    <Routes>
      <Route path="/Logs/" element={<SystemLogs />} />
      <Route path="/*" element={<SystemSettings dataRef={data}/>} />
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
      Tabs={SettingsTabs}
    />
  </div>;
}
