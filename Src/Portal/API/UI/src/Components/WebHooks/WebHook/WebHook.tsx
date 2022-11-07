import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import WebHookInfo from "./WebHookInfo/WebHookInfo";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import WebHookInfoBar from "./WebHookInfoBar/WebHookInfoBar";
import WebHookSettings from "./WebHookSettings/WebHookSettings";
import { WebHookQuery } from "./__generated__/WebHookQuery.graphql";
import RouterTabList, { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";


export const SettingsTabs = [
  {
    label: "Info",
    path: ``,
  },
  {
    label: "Settings",
    path: `Settings`,
  }
] as RouterTabItemType[];

const WebHookQueryTag = graphql`
  query WebHookQuery($hook_id:ID!){
    webHookById(hook_id:$hook_id){
      ...WebHookInfoBarDataFragment
    }
  }
`;

export default React.memo(WebHook)

function WebHook() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<WebHookQuery>(
    WebHookQueryTag,
    {hook_id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name={"Hook"}
      component={<WebHookInfoBar dataRef={data.webHookById}/>}
    />

    <TabSection/>

    <Routes>
      <Route path="/Settings/" element={<WebHookSettings/>} />
      <Route path="/*" element={<WebHookInfo/>} />
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