import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import WebHookInfo from "./WebHookInfo/WebHookInfo";
import PageContainer from "../../Layout/PageContainer";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import WebHookInfoBar from "./WebHookInfoBar/WebHookInfoBar";
import WebHookSettings from "./WebHookSettings/WebHookSettings";
import StyledTabSection from "../../../Shared/StyledTabSection";
import { WebHookQuery } from "./__generated__/WebHookQuery.graphql";
import { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";


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

  return <PageContainer>
    <Section 
      name={"Hook"}
      component={<WebHookInfoBar dataRef={data.webHookById}/>}
    />

    <StyledTabSection tabs={SettingsTabs}/>

    <Routes>
      <Route path="/Settings/" element={<WebHookSettings/>} />
      <Route path="/*" element={<WebHookInfo/>} />
    </Routes>

  </PageContainer>
}