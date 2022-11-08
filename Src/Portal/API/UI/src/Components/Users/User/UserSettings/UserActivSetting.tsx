import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { UserActivSettingDataFragment$key } from "./__generated__/UserActivSettingDataFragment.graphql";
import { UserActivSettingUpdateMutation } from "./__generated__/UserActivSettingUpdateMutation.graphql";


export const UserActivSettingDataFragment = graphql`
  fragment UserActivSettingDataFragment on GQL_User 
  {
    id
    enabled
  }
`;

const UserActivSettingMutationTag = graphql`
  mutation UserActivSettingUpdateMutation($input: UpdateUserEnabledInput!) {
    updateUserEnabled(input: $input) {
      ... on UpdateUserEnabledPayload {          
        gQL_User{
          id
          enabled
        }
        errors{
            __typename

            ... on ValidationError{
                errors{
                property
                message
                }
            }

            ... on ResultError{
                message
            }
            }
      }
    }
}
`

export default React.memo(UserActivSetting)

type UserActivSettingProps = {
  dataRef:UserActivSettingDataFragment$key | null | undefined;
}

function UserActivSetting({dataRef}:UserActivSettingProps) {

  const data = useFragment(UserActivSettingDataFragment, dataRef!);

    const [
    commit,
    isInFlight,
  ] = useMutation<UserActivSettingUpdateMutation>(UserActivSettingMutationTag);

  const toast = useToast();


  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            user_id: data.id,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.updateUserEnabled?.gQL_User){
            // ...
          }
          HandleErrors(toast, response?.updateUserEnabled?.errors);
        },

        optimisticUpdater(store){
          var hook = store.get(data.id);

          hook?.setValue(checked,"isActive")
        }

      });
    },
    [isInFlight,data.id,commit,toast]
  );

  return <div
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-2xl">
      <FormSwitch
        id={"enabled"}
        checked={data.enabled}
        label={"Enable"}
        onChange={handleCheckedEvent}
      />
    </div>
  }
