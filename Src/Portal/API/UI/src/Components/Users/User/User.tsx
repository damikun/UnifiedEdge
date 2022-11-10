import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import UserInfoBar from "./UserInfoBar/UserInfoBar";
import UserSettings from "./UserSettings/UserSettings";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import { UserQuery } from "./__generated__/UserQuery.graphql";
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

const UserQueryTag = graphql`
  query UserQuery($user_id:ID!){
    userById(user_id:$user_id){
      ...UserInfoBarDataFragment
    }
  }
`;

export default React.memo(User)

function User() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<UserQuery>(
    UserQueryTag,
    {user_id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <Section 
      name={"User"}
      component={<UserInfoBar dataRef={data.userById}/>}
    />

    <TabSection/>

    <Routes>
      <Route path="/Settings/" element={<UserSettings/>} />
      <Route path="/*" element={<UserInfo/>} />
    </Routes>

  </>
}

function TabSection() {
  return <div className="flex sticky top-16 bg-gray-50 shadow-sm w-full">
    <RouterTabList
      hoverEffect
      tabStyle={"h-11 hover:bg-transparent"}
      flexVariant="row"
      defaultIndex={0}
      Tabs={SettingsTabs} />
  </div>;
}