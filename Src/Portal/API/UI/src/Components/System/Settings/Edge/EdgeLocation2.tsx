import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { EdgeLocation2DataFragment$key } from "./__generated__/EdgeLocation2DataFragment.graphql";
import { EdgeLocation2UpdateMutation, SetEdgeLocation2Input } from "./__generated__/EdgeLocation2UpdateMutation.graphql";



export const EdgeLocation2DataFragment = graphql`
  fragment EdgeLocation2DataFragment on GQL_Edge 
  {
    id
    location2
  }
`;

const EdgeLocation2MutationTag = graphql`
  mutation EdgeLocation2UpdateMutation($request: SetEdgeLocation2Input!) {
      setEdgeLocation2(request: $request) {
      ... on SetEdgeLocation2Payload {          
        gQL_Edge{
          id
          location2
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

export default React.memo(EdgeLocation2)

type EdgeLocation2Props = {
  dataRef:EdgeLocation2DataFragment$key | null | undefined;
}

function EdgeLocation2({dataRef}:EdgeLocation2Props) {

  const data = useFragment(EdgeLocation2DataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<EdgeLocation2UpdateMutation>(EdgeLocation2MutationTag);


  const toast = useToast();

  const formik = useFormik<SetEdgeLocation2Input>({
    initialValues: {
      location2: data?.location2 ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              location2: values.location2,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setEdgeLocation2?.gQL_Edge){
              // ...
            }
            
            HandleErrors(toast, response?.setEdgeLocation2?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        Location2: [
          is.maxLength(100)
        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.location2 !== null ? formik.values.location2 !== data.location2 : formik.values.location2 !== "",
   [data, formik.values.location2]
  )

  return <form
        onSubmit={formik.handleSubmit}
        className="pb-2 w-full flex flex-row space-x-2 max-w-sm">
          <FormInput
          label="Location B"
          id="location2"
          // flexOrientation="flex-row"
          disabled={isInFlight}
          error={formik.errors.location2}
          value={formik.values.location2}
          onChange={formik.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
          }
        />
       
      </form>
}
