import clsx from "clsx";
import { useFormik } from "formik";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useMemo } from "react";
import { useFragment, useMutation } from "react-relay";
import { EVENT_GROUPS } from "../../WebHookList/WebHookGroups";
import { generateErrors } from "../../../../Utils/Validation";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { WebHookEventGroupsSettingDataFragment$key } from "./__generated__/WebHookEventGroupsSettingDataFragment.graphql";
import { UpdateWebHookEventGroupsInput, WebHookEventGroupsSettingUpdateMutation } from "./__generated__/WebHookEventGroupsSettingUpdateMutation.graphql";
import { HandleErrors } from "../../../../Utils/ErrorHelper";


export const WebHookEventGroupsSettingDataFragment = graphql`
  fragment WebHookEventGroupsSettingDataFragment on GQL_WebHook 
  {
    id
    eventGroup
  }
`;

const WebHookEventGroupsSettingMutationTag = graphql`
  mutation WebHookEventGroupsSettingUpdateMutation($input: UpdateWebHookEventGroupsInput!) {
    updateWebHookEventGroups(input: $input) {
      ... on UpdateWebHookEventGroupsPayload {          
        gQL_WebHook{
          id
          eventGroup
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

export default React.memo(WebHookEventGroupsSetting)

type WebHookEventGroupsSettingProps = {
  dataRef:WebHookEventGroupsSettingDataFragment$key | null | undefined;
}

function WebHookEventGroupsSetting({dataRef}:WebHookEventGroupsSettingProps) {

  const data = useFragment(WebHookEventGroupsSettingDataFragment, dataRef!);

  const [
    commit,
    isInFlight,
  ] = useMutation<WebHookEventGroupsSettingUpdateMutation>(WebHookEventGroupsSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateWebHookEventGroupsInput>({
    initialValues: {
      hook_id:data.id,
      groups:data.eventGroup,
    },

    onSubmit: async (values) => {
      !isInFlight &&
      commit({
        variables: {
          input: {
            hook_id: data.id,
            groups: values.groups,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.updateWebHookEventGroups?.gQL_WebHook){
            // ...
          }
          HandleErrors(toast, response?.updateWebHookEventGroups?.errors);
        },

      });
    },

    validate: (values) => {
      return generateErrors(values, {
        groups: [],
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => {
    if(data.eventGroup.length !== formik.values.groups.length){
      return true;
    }

    data.eventGroup.forEach(ee=>{
      if(!formik.values.groups.some(e=>e ===ee)){
        return true
      }
    });

    formik.values.groups.forEach(ee=>{
      if(!data.eventGroup.some(e=>e ===ee)){
        return true
      }
    });

    return false;
  } ,
   [data, formik.values.groups]
  )

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      if(id){
        if(!checked){
          formik.setFieldValue("groups",formik.values.groups.filter(e=>e !== id))
        }else{
          formik.setFieldValue("groups",[id,...formik.values.groups])
        }
      }
    },
    [formik]
  );
  
  const isChecked = useCallback(
    (id:string) => {
      return formik.values.groups.find(e=>e ===id) !== undefined
    },
    [formik.values.groups],
  )
  
  
  return <form
    onSubmit={formik.handleSubmit}
    className="pb-2 w-full flex flex-row space-x-2 max-w-2xl">

    <div className="flex flex-col w-full relative space-y-2 pb-10">
      <label className="font-semibold text-base">Trigger Group</label>
      {EVENT_GROUPS.map((enity,index) => (
        <div
          key={index}
          className={clsx(
            "flex flex-row w-full flex-nowrap justify-between",
            "items-center space-x-5"
          )}
        >
          <div className="flex flex-col w-9/12">
            <h6 className="font-bold text-base capitalize">
              {enity.id}
            </h6>
            <p className="text-base">
              {enity.description}
            </p>
          </div>
          
          <div className="flex w-3/12 items-start justify-start">
            <FormSwitch
              id={enity.id}
              checked={isChecked(enity.id)}
              label={enity.id}
              value={enity.id}
              name={enity.id}
              onChange={handleCheckedEvent}
            />
          </div>
        </div>
      ))}

      <div className="max-w-sm">
        {
          hasChanged && <StayledButton
          disabled={isInFlight}
          isloading={isInFlight}
          variant={"secondaryblue"}
          size="normal"
          type="submit"
        >
            Save Change
          </StayledButton>
        }
      </div>
    </div>
  </form>
}
