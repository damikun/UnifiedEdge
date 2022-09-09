import React from "react";
import { Route, Routes } from "react-router";
import RouterTabList, { RouterTabItemType } from "../../../UIComponents/RouterTab/RouterTabList";
import Section from "../../../UIComponents/Section/Section";

export default React.memo(Server)

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

function Server() {

//   const data = useLazyLoadQuery<MonitorQuery>(
//     MonitorQueryTag,
//     {},
//     {
//       fetchPolicy: "store-and-network",
//       UNSTABLE_renderPolicy: "partial"
//     },
//   );

  return <>
    <Section 
      name="Edge"
      component={<div>Some data tabs</div>}
    />

    <TabSection/>

    <Routes>
      <Route path="/Settings/" element={<Dummy/>} />
      <Route path="/Logs/" element={<Dummy/>} />
      <Route path="/Explore/" element={<Dummy/>} />
      <Route path="/*" element={<Dummy/>} />
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