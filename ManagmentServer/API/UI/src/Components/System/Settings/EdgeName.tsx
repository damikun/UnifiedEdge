import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import { EdgeNameDataFragment$key } from "./__generated__/EdgeNameDataFragment.graphql";
import { EdgeNameUpdateMutation, SetEdgeNameInput } from "./__generated__/EdgeNameUpdateMutation.graphql";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";


export const EdgeNameDataFragment = graphql`
  fragment EdgeNameDataFragment on GQL_Edge 
  {
    id
    name
  }
`;

const EdgeNameMutationTag = graphql`
  mutation EdgeNameUpdateMutation($request: SetEdgeNameInput!) {
      setEdgeName(request: $request) {
      ... on SetEdgeNamePayload {          
        gQL_Edge{
          id
          name
        }
      }
    }
}
`

export default React.memo(EdgeName)

type EdgeNameProps = {
  dataRef:EdgeNameDataFragment$key | null | undefined;
}

function EdgeName({dataRef}:EdgeNameProps) {

  const data = useFragment(EdgeNameDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<EdgeNameUpdateMutation>(EdgeNameMutationTag);


  const toast = useToast();

  const formik = useFormik<SetEdgeNameInput>({
    initialValues: {
      name: data?.name ?? "Undefined",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              name: values.name,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.setEdgeName.gQL_Edge){
              // ...
            }
            // HandleErrors(toast, response.createServer?);
            // if (response.createServer?.errors?.length === 0) {
            //   startTransition(() => {
            //     navigate(`/Hooks`);
            //   });
            // }
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
          label="Edge name"
          id="name"
          // flexOrientation="flex-row"
          disabled={isInFlight}
          error={formik.errors.name}
          value={formik.values.name}
          onChange={formik.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
          }
        />
       
      </form>
}
