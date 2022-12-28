import React, { useState } from "react";
import AdapterLogs from "./AdapterLogs";
import AdapterAddress from "./AdapterAddress";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../Layout/PageContainer";
import { Route, Routes,useParams } from "react-router";
import Section from "../../UIComponents/Section/Section";
import StyledTabSection from "../../Shared/StyledTabSection";
import { AdapterQuery } from "./__generated__/AdapterQuery.graphql";
import { RouterTabItemType } from "../../UIComponents/RouterTab/RouterTabList";


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
  # @argumentDefinitions(skipLogs: { type: Boolean, defaultValue: false })
  query AdapterQuery($id:ID!){
    adapterById(id:$id){
      name
      ...AdapterAddressDataFragment
      ...AdapterLogsPaginationFragment_logs
      # ...AdapterLogsDataFragment
      # @skip(if:$skipLogs)
    }
  }
`;

export default React.memo(Adapter)

function Adapter() {

  const { id }: any = useParams<string>();

  const [adapter_id] = useState(id)

  const data = useLazyLoadQuery<AdapterQuery>(
    AdapterQueryTag,
    {id:adapter_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <PageContainer>
    <Section 
      name={data.adapterById.name}
      component={<div></div>}
    />

    <StyledTabSection tabs={SettingsTabs}/>

    <Routes>
      <Route path="/Logs/" element={<AdapterLogs dataRef={data.adapterById}/>} />
      <Route path="/*" element={<AdapterAddress dataRef={data.adapterById}/>} />
    </Routes>

  </PageContainer>
}
