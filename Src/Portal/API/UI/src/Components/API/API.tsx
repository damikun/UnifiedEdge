import React from "react";
import ApiInfo from "./ApiInfo";
import ApiRest from "./ApiRest";
import ApiTokens from "./ApiTokens";
import ApiGraphql from "./ApiGraphql";
import { Route, Routes } from "react-router";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../Layout/PageContainer";
import Section from "../../UIComponents/Section/Section";
import { APIQuery } from "./__generated__/APIQuery.graphql";
import StyledTabSection from "../../Shared/StyledTabSection";
import { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";



const APIQueryTag = graphql`
  query APIQuery{
    edgeInfo{
      id
      ...ApiInfoFragment
    }
  }
`;

export const APITabs = [
  {
    label: "Tokens",
    path: ``,
  },
  {
    label: "Graphql",
    path: `Graphql`,
  },
  {
    label: "Rest",
    path: `Rest`,
  }
] as RouterTabItemType[];

export default React.memo(API)

function API() {

  const data = useLazyLoadQuery<APIQuery>(
    APIQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <PageContainer>
    <Section 
      name={"API"}
      component={
        <ApiInfo dataRef={data.edgeInfo}/>
      }
    />

    <StyledTabSection tabs={APITabs}/>

    <Routes>
      <Route path="/Rest/" element={<ApiRest/>} />
      <Route path="/Graphql/" element={<ApiGraphql/>} />
      <Route path="/*" element={<ApiTokens/>} />
    </Routes>

  </PageContainer>
}