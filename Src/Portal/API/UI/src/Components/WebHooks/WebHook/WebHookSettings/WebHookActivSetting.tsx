import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { WebHookActivSettingDataFragment$key } from "./__generated__/WebHookActivSettingDataFragment.graphql";
import { WebHookActivSettingUpdateMutation } from "./__generated__/WebHookActivSettingUpdateMutation.graphql";


export const WebHookActivSettingDataFragment = graphql`
  fragment WebHookActivSettingDataFragment on GQL_WebHook 
  {
    id
    isActive
  }
`;

const WebHookActivSettingMutationTag = graphql`
  mutation WebHookActivSettingUpdateMutation($input: UpdateWebHookActiveStateInput!) {
    updateWebHookActiveState(input: $input) {
      ... on UpdateWebHookActiveStatePayload {          
        gQL_WebHook{
          id
          isActive
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

export default React.memo(WebHookActivSetting)

type WebHookActivSettingProps = {
  dataRef:WebHookActivSettingDataFragment$key | null | undefined;
}

function WebHookActivSetting({dataRef}:WebHookActivSettingProps) {

  const data = useFragment(WebHookActivSettingDataFragment, dataRef!);

    const [
    commit,
    isInFlight,
  ] = useMutation<WebHookActivSettingUpdateMutation>(WebHookActivSettingMutationTag);

  const toast = useToast();


  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            hook_id: data.id,
            activ: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.updateWebHookActiveState?.gQL_WebHook){
            // ...
          }
          HandleErrors(toast, response?.updateWebHookActiveState?.errors);
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
    className="pb-2 w-full flex flex-row space-x-2 max-w-2xl">
      <FormSwitch
        id={"active"}
        checked={data.isActive}
        label={"Enable"}
        onChange={handleCheckedEvent}
      />
    </div>
  }
