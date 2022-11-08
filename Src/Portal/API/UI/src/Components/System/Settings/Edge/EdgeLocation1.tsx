import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { EdgeLocation1DataFragment$key } from "./__generated__/EdgeLocation1DataFragment.graphql";
import { EdgeLocation1UpdateMutation, SetEdgeLocation1Input } from "./__generated__/EdgeLocation1UpdateMutation.graphql";


export const EdgeLocation1DataFragment = graphql`
  fragment EdgeLocation1DataFragment on GQL_Edge 
  {
    id
    location1
  }
`;

const EdgeLocation1MutationTag = graphql`
  mutation EdgeLocation1UpdateMutation($request: SetEdgeLocation1Input!) {
      setEdgeLocation1(request: $request) {
      ... on SetEdgeLocation1Payload {          
        gQL_Edge{
          id
          location1
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

export default React.memo(EdgeLocation1)

type EdgeLocation1Props = {
  dataRef:EdgeLocation1DataFragment$key | null | undefined;
}

function EdgeLocation1({dataRef}:EdgeLocation1Props) {

  const data = useFragment(EdgeLocation1DataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<EdgeLocation1UpdateMutation>(EdgeLocation1MutationTag);


  const toast = useToast();

  const formik = useFormik<SetEdgeLocation1Input>({
    initialValues: {
      location1: data?.location1 ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              location1: values.location1,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setEdgeLocation1?.gQL_Edge){
              // ...
            }
            HandleErrors(toast, response?.setEdgeLocation1?.errors);

          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        Location1: [
          is.maxLength(100)
        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.location1 !== null ? formik.values.location1 !== data.location1 : formik.values.location1 !== "",
   [data, formik.values.location1]
  )

  return <form
        onSubmit={formik.handleSubmit}
        className="pb-2 w-full flex flex-row space-x-2 max-w-sm">
          <FormInput
          label="Location A"
          id="location1"
          // flexOrientation="flex-row"
          disabled={isInFlight}
          error={formik.errors.location1}
          value={formik.values.location1}
          onChange={formik.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
          }
        />
       
      </form>
}
