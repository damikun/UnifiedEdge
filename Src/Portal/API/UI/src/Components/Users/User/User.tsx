import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import UserInfoBar from "./UserInfoBar/UserInfoBar";
import PageContainer from "../../Layout/PageContainer";
import UserSettings from "./UserSettings/UserSettings";
import { Route, Routes, useParams } from "react-router";
import Section from "../../../UIComponents/Section/Section";
import { UserQuery } from "./__generated__/UserQuery.graphql";
import StyledTabSection from "../../../Shared/StyledTabSection";
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

  return <PageContainer>
    <Section 
      name={"User"}
      component={<UserInfoBar dataRef={data.userById}/>}
    />

    <StyledTabSection tabs={SettingsTabs}/>

    <Routes>
      <Route path="/Settings/" element={<UserSettings/>} />
      <Route path="/*" element={<UserInfo/>} />
    </Routes>

  </PageContainer>
}
