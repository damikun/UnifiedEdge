import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { WebHookSecretSettingDataFragment$key } from "./__generated__/WebHookSecretSettingDataFragment.graphql";
import { UpdateWebHookSecretInput, WebHookSecretSettingUpdateMutation } from "./__generated__/WebHookSecretSettingUpdateMutation.graphql";



export const WebHookSecretSettingDataFragment = graphql`
  fragment WebHookSecretSettingDataFragment on GQL_WebHook 
  {
    id
    secret
  }
`;

const WebHookSecretSettingMutationTag = graphql`
  mutation WebHookSecretSettingUpdateMutation($input: UpdateWebHookSecretInput!) {
    updateWebHookSecret(input: $input) {
      ... on UpdateWebHookSecretPayload {          
        gQL_WebHook{
          id
          secret
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

export default React.memo(WebHookSecretSetting)

type WebHookSecretSettingProps = {
  dataRef:WebHookSecretSettingDataFragment$key | null | undefined;
}

function WebHookSecretSetting({dataRef}:WebHookSecretSettingProps) {

  const data = useFragment(WebHookSecretSettingDataFragment, dataRef!);

    const [
    commit,
    isInFlight,
  ] = useMutation<WebHookSecretSettingUpdateMutation>(WebHookSecretSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateWebHookSecretInput>({
    initialValues: {
      hook_id:data.id,
      secret:data.secret??"",
    },

    onSubmit: async (values) => {
      !isInFlight && hasChanged&&
        commit({
          variables: {
            input: {
              hook_id: data.id,
              secret: values.secret,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.updateWebHookSecret.gQL_WebHook){
              // ...
            }
            HandleErrors(toast, response?.updateWebHookSecret?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        secret: [],
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.secret !== null ? formik.values.secret !== data.secret : formik.values.secret !== "",
   [data, formik.values.secret]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="Secret"
        id="secret"
        disabled={isInFlight}
        type="password"
        error={formik.errors.secret}
        value={formik.values.secret}
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
