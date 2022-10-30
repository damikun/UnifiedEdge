import { useFormik } from "formik";
import React, { useMemo } from "react";
import { URL_REGEX } from "../../../../constants";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { WebHookUrlSettingDataFragment$key } from "./__generated__/WebHookUrlSettingDataFragment.graphql";
import { UpdateWebHookUrlInput, WebHookUrlSettingUpdateMutation } from "./__generated__/WebHookUrlSettingUpdateMutation.graphql";


export const WebHookUrlSettingDataFragment = graphql`
  fragment WebHookUrlSettingDataFragment on GQL_WebHook 
  {
    id
    webHookUrl
  }
`;

const WebHookUrlSettingMutationTag = graphql`
  mutation WebHookUrlSettingUpdateMutation($input: UpdateWebHookUrlInput!) {
    updateWebHookUrl(input: $input) {
      ... on UpdateWebHookUrlPayload {          
        gQL_WebHook{
          id
          webHookUrl
        }
      }
    }
}
`

export default React.memo(WebHookUrlSetting)

type WebHookUrlSettingProps = {
  dataRef:WebHookUrlSettingDataFragment$key | null | undefined;
}

function WebHookUrlSetting({dataRef}:WebHookUrlSettingProps) {

  const data = useFragment(WebHookUrlSettingDataFragment, dataRef!);

    const [
    commit,
    isInFlight,
  ] = useMutation<WebHookUrlSettingUpdateMutation>(WebHookUrlSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateWebHookUrlInput>({
    initialValues: {
      hook_id:data.id,
      url:data.webHookUrl,
    },

    onSubmit: async (values) => {
        !isInFlight && hasChanged&&
        commit({
          variables: {
            input: {
              hook_id: data.id,
              url: values.url,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.updateWebHookUrl.gQL_WebHook){
              // ...
            }
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        url: [
          is.required(),
          is.minLength(5),
          is.match(() => {
            return values.url.match(URL_REGEX);
          }, "Invalid URL format"),
        ],
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.url !== data.webHookUrl ,
   [data, formik.values.url]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-2xl">
      <FormInput
        label="Endpoint"
        id="url"
        disabled={isInFlight}
        error={formik.errors.url}
        value={formik.values.url}
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
