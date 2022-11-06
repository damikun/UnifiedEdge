import React, { useCallback, useEffect, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { UserAdminSettingDataFragment$key } from "./__generated__/UserAdminSettingDataFragment.graphql";
import { UserAdminSettingUpdateMutation } from "./__generated__/UserAdminSettingUpdateMutation.graphql";


export const UserAdminSettingDataFragment = graphql`
  fragment UserAdminSettingDataFragment on Query
  @argumentDefinitions(
    user_id: { type: "ID!" }
  )
  {
    userById(user_id:$user_id){
      id
    }

    user:isAdmin(user_id:$user_id){
      isAdmin
    }
  }
`;

const UserAdminSettingMutationTag = graphql`
  mutation UserAdminSettingUpdateMutation($input: SetUserAdminInput!,$user_id:ID!) {
    setUserAdmin(input: $input) {
      ... on SetUserAdminPayload {          
        gQL_User{
          id
          enabled
        }
        query{
          isAdmin(user_id:$user_id){
            isAdmin
          }
        }
      }
    }
}
`


export default React.memo(UserAdminSetting)

type UserAdminSettingProps = {
  dataRef:UserAdminSettingDataFragment$key | null | undefined;
}

function UserAdminSetting({dataRef}:UserAdminSettingProps) {

  const data = useFragment(UserAdminSettingDataFragment, dataRef!);

    const [
    commit,
    isInFlight,
  ] = useMutation<UserAdminSettingUpdateMutation>(UserAdminSettingMutationTag);

  const toast = useToast();

  const [stateIsAdmin, setAdminState] = useState(data.user.isAdmin)

  useEffect(() => {
    setAdminState(data.user.isAdmin)
  }, [data.user.isAdmin])
  

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            user_id: data.userById.id,
            is_admin: checked,
          },
          user_id:data.userById.id
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response.setUserAdmin.gQL_User){

            setAdminState(response?.setUserAdmin?.query?.isAdmin?.isAdmin)
          }else{
            setAdminState(!checked)
          }
        },

        optimisticUpdater(store, value){
          setAdminState(checked)
        }

      });
    },
    [isInFlight,commit,toast,data.userById.id]
  );

  return <div
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-2xl">
      <FormSwitch
        id={"isAdmin"}
        checked={stateIsAdmin}
        label={"Admin"}
        onChange={handleCheckedEvent}
      />
    </div>
  }
