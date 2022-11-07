import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { WebHookNameSettingDataFragment$key } from "./__generated__/WebHookNameSettingDataFragment.graphql";
import { UpdateWebHookNameInput, WebHookNameSettingUpdateMutation } from "./__generated__/WebHookNameSettingUpdateMutation.graphql";


export const WebHookNameSettingDataFragment = graphql`
  fragment WebHookNameSettingDataFragment on GQL_WebHook 
  {
    id
    name
  }
`;

const WebHookNameSettingMutationTag = graphql`
  mutation WebHookNameSettingUpdateMutation($input: UpdateWebHookNameInput!) {
    updateWebHookName(input: $input) {
      ... on UpdateWebHookNamePayload {          
        gQL_WebHook{
          id
          name
        }
      }
    }
}
`

export default React.memo(WebHookNameSetting)

type WebHookNameSettingProps = {
  dataRef:WebHookNameSettingDataFragment$key | null | undefined;
}

function WebHookNameSetting({dataRef}:WebHookNameSettingProps) {

  const data = useFragment(WebHookNameSettingDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<WebHookNameSettingUpdateMutation>(WebHookNameSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateWebHookNameInput>({
    initialValues: {
      name:data.name,
      hook_id:data.id
    },

    onSubmit: async (values) => {
      !isInFlight && hasChanged&&
        commit({
          variables: {
            input: {
              name: values.name,
              hook_id:data.id
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.updateWebHookName.gQL_WebHook){
              // ...
            }
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        name: [
          is.required(),
          is.minLength(2),
        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.name !== data.name ,
   [data, formik.values.name]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="Name"
        id="name"
        disabled={isInFlight}
        error={formik.errors.name}
        value={formik.values.name}
        onChange={formik.handleChange}
        afterFieldComponent={
          hasChanged && <StayledButton
          isloading={isInFlight}
          className="mt-auto"
          type="submit">
            Save
          </StayledButton>
        }
      /> 
  </form>
}
