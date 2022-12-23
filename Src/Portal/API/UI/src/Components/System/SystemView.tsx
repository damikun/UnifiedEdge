import React from "react";
import SystemLogs from "./Logs/SystemLogs";
import EdgeInfo from "../Monitor/EdgeInfo";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../Layout/PageContainer";
import SchedulerView from "./Scheduler/SchedulerView";
import SystemSettings from "./Settings/SystemSettings";
import { Route, Routes, useParams } from "react-router";
import Section from "../../UIComponents/Section/Section";
import StyledTabSection from "../../Shared/StyledTabSection";
import { SystemViewQuery } from "./__generated__/SystemViewQuery.graphql";
import { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";



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
    ...NetworkSettingsDataFragment
  }
`;

export default React.memo(SystemView)

function SystemView() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<SystemViewQuery>(
    SystemViewQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <PageContainer>
    <Section 
      name={"Edge"}
      component={<EdgeInfo dataRef={data} />}
    />

    <StyledTabSection tabs={SettingsTabs}/>

    <Routes>
      <Route path="/Logs/" element={<SystemLogs />} />
      <Route path="/Scheduler/" element={<SchedulerView />} />
      <Route path="/*" element={<SystemSettings dataRef={data}/>} />
    </Routes>

  </PageContainer>
}
