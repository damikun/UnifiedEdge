import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { EdgeDescriptionDataFragment$key } from "./__generated__/EdgeDescriptionDataFragment.graphql";
import { EdgeDescriptionUpdateMutation, SetEdgeDescriptionInput } from "./__generated__/EdgeDescriptionUpdateMutation.graphql";


export const EdgeDescriptionDataFragment = graphql`
  fragment EdgeDescriptionDataFragment on GQL_Edge 
  {
    id
    description
  }
`;

const EdgeDescriptionMutationTag = graphql`
  mutation EdgeDescriptionUpdateMutation($request: SetEdgeDescriptionInput!) {
      setEdgeDescription(request: $request) {
      ... on SetEdgeDescriptionPayload {          
        gQL_Edge{
          id
          description
        }
      }
    }
}
`

export default React.memo(EdgeDescription)

type EdgeDescriptionProps = {
  dataRef:EdgeDescriptionDataFragment$key | null | undefined;
}

function EdgeDescription({dataRef}:EdgeDescriptionProps) {

  const data = useFragment(EdgeDescriptionDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<EdgeDescriptionUpdateMutation>(EdgeDescriptionMutationTag);


  const toast = useToast();

  const formik = useFormik<SetEdgeDescriptionInput>({
    initialValues: {
      description: data?.description ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              description: values.description,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.setEdgeDescription.gQL_Edge){
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
        description: [
          is.required(),
          is.minLength(2),
        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.description !== data?.description && formik.values.description !== "",
   [data, formik.values.description]
  )

  return <form
        onSubmit={formik.handleSubmit}
        className="pb-2 w-full flex flex-row space-x-2">
          <FormInput
          label="Edge description"
          id="description"
          // flexOrientation="flex-row"
          disabled={isInFlight}
          error={formik.errors.description}
          value={formik.values.description}
          onChange={formik.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
          }
        />
       
      </form>
}
