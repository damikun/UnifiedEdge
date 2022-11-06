import React, { useState } from "react";
import UserRolesInfo from "./UserRolesInfo";
import { useParams } from "react-router-dom";
import UserClaimsInfo from "./UserClaimsInfo";
import { useLazyLoadQuery } from "react-relay";
import UserGeneralInfo from "./UserGeneralInfo";
import { graphql } from "babel-plugin-relay/macro";
import { UserInfoQuery } from "./__generated__/UserInfoQuery.graphql";


export const UserInfoQueryTag = graphql`
  query UserInfoQuery($id:ID!) 
  {
    userById(user_id:$id) {
      ...UserGeneralInfoFragment
    }
    ...UserClaimsInfoFragment @arguments(user_id:$id)
    ...UserRolesInfoFragment @arguments(user_id:$id)
  }
`;

export default React.memo(UserInfo)

function UserInfo() {

  const { id }: any = useParams<string>();

  console.log(id)
  const [hook_id, setHook_id] = useState(id)

  const data = useLazyLoadQuery<UserInfoQuery>(
    UserInfoQueryTag,
    {id:hook_id},
    {
      fetchPolicy: "store-and-network"
    },
  );

  return <>
    <UserGeneralInfo dataRef={data.userById}/>
    <UserClaimsInfo dataRef={data}/>
    <UserRolesInfo dataRef={data}/>
  </>
} 