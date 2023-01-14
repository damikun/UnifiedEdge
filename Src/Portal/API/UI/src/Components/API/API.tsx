import React, { lazy, Suspense } from "react";
import ApiTokens from "./ApiTokens";
import { Route, Routes } from "react-router";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../Layout/PageContainer";
import Section from "../../UIComponents/Section/Section";
import { APIQuery } from "./__generated__/APIQuery.graphql";
import StyledTabSection from "../../Shared/StyledTabSection";
import { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";


const ApiInfo = lazy(
  () =>
    import(
      /* webpackChunkName: "ApiInfo" */ "./ApiInfo"
    )
);

const ApiGraphql = lazy(
  () =>
    import(
      /* webpackChunkName: "ApiGraphql" */ "./ApiGraphql"
    )
);

const ApiRest = lazy(
  () =>
    import(
      /* webpackChunkName: "ApiRest" */ "./ApiRest"
    )
);

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

    <Suspense fallback={null}>
      <Routes>
        <Route path="/Rest/" element={<ApiRest/>} />
        <Route path="/Graphql/" element={<ApiGraphql/>} />
        <Route path="/*" element={<ApiTokens/>} />
      </Routes>
    </Suspense>

  </PageContainer>
}