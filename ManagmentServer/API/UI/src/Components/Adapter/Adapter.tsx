import React from "react";
import AdapterAddress from "./AdapterAddress";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Route, Routes, useParams } from "react-router";
import Section from "../../UIComponents/Section/Section";
import { AdapterQuery } from "./__generated__/AdapterQuery.graphql";
import RouterTabList, { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";

export const SettingsTabs = [
  {
    label: "Info",
    path: ``,
  },
  {
    label: "Logs",
    path: `Logs`,
  },
] as RouterTabItemType[];

const AdapterQueryTag = graphql`
  query AdapterQuery($id:ID!){
    adapterById(id:$id){
      name
      ...AdapterAddressDataFragment
    }
  }
`;

export default React.memo(Adapter)

function Adapter() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<AdapterQuery>(
    AdapterQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name={data.adapterById.name}
      component={<div></div>}
    />

    <TabSection/>

    <Routes>
      <Route path="/Logs/" element={<AdapterAddress dataRef={data.adapterById}/>} />
      <Route path="/*" element={<AdapterAddress dataRef={data.adapterById}/>} />
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
