import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { EdgeLocation3DataFragment$key } from "./__generated__/EdgeLocation3DataFragment.graphql";import { EdgeLocation3UpdateMutation, SetEdgeLocation3Input } from "./__generated__/EdgeLocation3UpdateMutation.graphql";
;


export const EdgeLocation3DataFragment = graphql`
  fragment EdgeLocation3DataFragment on GQL_Edge 
  {
    id
    location3
  }
`;

const EdgeLocation3MutationTag = graphql`
  mutation EdgeLocation3UpdateMutation($request: SetEdgeLocation3Input!) {
      setEdgeLocation3(request: $request) {
      ... on SetEdgeLocation3Payload {          
        gQL_Edge{
          id
          location3
        }
      }
    }
}
`

export default React.memo(EdgeLocation3)

type EdgeLocation3Props = {
  dataRef:EdgeLocation3DataFragment$key | null | undefined;
}

function EdgeLocation3({dataRef}:EdgeLocation3Props) {

  const data = useFragment(EdgeLocation3DataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<EdgeLocation3UpdateMutation>(EdgeLocation3MutationTag);


  const toast = useToast();

  const formik = useFormik<SetEdgeLocation3Input>({
    initialValues: {
      location3: data?.location3 ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              location3: values.location3,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.setEdgeLocation3.gQL_Edge){
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
        Location3: [

        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() =>data?.location3 !== null ? formik.values.location3 !== data.location3 : formik.values.location3 !== "",
   [data, formik.values.location3]
  )

  return <form
        onSubmit={formik.handleSubmit}
        className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-sm">
          <FormInput
          label="Location C"
          id="location3"
          // flexOrientation="flex-row"
          disabled={isInFlight}
          error={formik.errors.location3}
          value={formik.values.location3}
          onChange={formik.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
          }
        />
       
      </form>
}
