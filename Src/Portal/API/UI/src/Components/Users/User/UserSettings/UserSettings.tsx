import clsx from "clsx";
import UserRemove from "./UserRemove";
import React, { useMemo } from "react";
import SetPassword from "./SetPassword";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import UserAdminSetting from "./UserAdminSetting";
import UserActivSetting from "./UserActivSetting";
import { graphql } from "babel-plugin-relay/macro";
import UserLastNameSetting from "./UserLastNameSetting";
import UserFirstNameSetting from "./UserFirstNameSetting";
import { useUserStore } from "../../../../Utils/UserProvider";
import Section from "../../../../UIComponents/Section/Section";
import { UserSettingsQuery } from "./__generated__/UserSettingsQuery.graphql";


export const UserSettingsQueryTag = graphql`
  query UserSettingsQuery($user_id:ID!,$current_user_id:ID!) 
  {
    userById(user_id:$user_id){
      id
      ...UserFirstNameSettingDataFragment
      ...UserLastNameSettingDataFragment
      ...UserActivSettingDataFragment
      ...UserRemoveDataFragment
      ...SetPasswordDataFragment
    }

    isAdmin(user_id:$current_user_id){
      isAdmin
    }

    me{
      id
    }

    ...UserAdminSettingDataFragment @arguments(user_id:$user_id)
  }
`;

export default React.memo(UserSettings)

function UserSettings() {

  const { id }: any = useParams<string>();

  const user = useUserStore();

  const data = useLazyLoadQuery<UserSettingsQuery>(
    UserSettingsQueryTag,
    {
      user_id:id,
      current_user_id:user?.user?.me?.id as string
    },
    {
      fetchPolicy: "store-and-network",
    },
  );

  const userStore = useUserStore()

  const isNotCurrentUser = useMemo(() => {
    if(!userStore?.user?.me){
      return false
    }

    if(userStore.user.me?.id === data.userById.id){
      return false
    }

    return true;

  }, [data.userById.id,userStore?.user?.me])

  return <>
    {
      data && !data.isAdmin?.isAdmin && data.me?.id !== data.userById.id && <>
        <Section 
          component={
            <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
            "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2")}>
              <span className="text-lg font-semibold text-yellow-600">
                Only Admin users can see this view!
              </span>
              <span className="text-gray-500 font-semibold">
                Ask any admin to give you additional permissions.
              </span>
            </div>
          }
        />
      </>
    }
      
    {
      (data.isAdmin?.isAdmin || data.me?.id === data.userById.id) &&<>
       <Section 
        component={
          <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
          "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2")}>
            <div className="max-w-2xl w-full">
              {
                 isNotCurrentUser && <UserActivSetting dataRef={data.userById}/>
              }

              {
                 isNotCurrentUser && data?.isAdmin?.isAdmin && <UserAdminSetting dataRef={data}/>
              }

              <UserFirstNameSetting dataRef={data.userById}/>
              <UserLastNameSetting dataRef={data.userById}/>
            </div>
          </div>
        }
      />
      </>
    }

    {
      isNotCurrentUser && data && data.isAdmin?.isAdmin && <Section 
      name="Remove User"
      component={
        <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
        "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-2xl w-full">
            <UserRemove dataRef={data.userById}/>
          </div>
        </div>
      }
      />
    }

    {
      data && data.me?.id === data.userById.id && <Section 
      name="Password"
      component={
        <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
        "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-2xl w-full">
            <SetPassword dataRef={data.userById}/>
          </div>
        </div>
      }
      />
    }
  </>
} 