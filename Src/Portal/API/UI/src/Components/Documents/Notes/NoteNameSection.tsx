import clsx from "clsx";
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { NoteNameSectionMutation, UpdateNoteNameInput } from "./__generated__/NoteNameSectionMutation.graphql";


export const NoteNameSectionDataFragmentTag = graphql`
  fragment NoteNameSectionDataFragment on GQL_Note 
  {
    id
    name
  }
`;

const NoteNameSectionutationTag = graphql`
  mutation NoteNameSectionMutation($input: UpdateNoteNameInput!) {
    updateNoteName(input: $input) {
      ... on UpdateNoteNamePayload {          
        gQL_Note {
          id
          ...NoteDataFragment
          ...NotesItemDataFragment
        }
        errors {
          __typename

          ... on ValidationError {
            errors {
              property
              message
            }
          }

          ... on ResultError {
            message
          }
        }
      }
    }
}
`

type NoteNameSectionProps = {
  dataRef:NoteDataFragment$key | null;
}

export default function NoteNameSection({dataRef}:NoteNameSectionProps){

    const { id }: any = useParams<string>();
    
    const [note_id] = useState(id)

    const data = useFragment(NoteNameSectionDataFragmentTag, dataRef);

    const [
      commit,
      isInFlight,
    ] = useMutation<NoteNameSectionMutation>(NoteNameSectionutationTag);

    const toast = useToast();

    const formik = useFormik<UpdateNoteNameInput>({
      initialValues: {
        noteId: note_id,
        name: data?.name ?? "Undefined",
      },
  
      onSubmit: async (values) => {
          !isInFlight &&
          commit({
            variables: {
              input: {
                noteId: values.noteId,
                name: values.name,
              }
            },
  
            onError(error) {
              toast?.pushError("Failed to process mutation");
              console.log(error);
            },
  
            onCompleted(response) {},
  
            updater(store, response) {
              if(response?.updateNoteName?.gQL_Note){
                // ...
              }
              HandleErrors(toast, response?.updateNoteName?.errors);
            },
  
          });
  
      },
  
      validate: (values) => {
        return generateErrors(values, {
          noteId :[is.required()],
          name: [
            is.required(),
            is.minLength(2),
          ]
        });
      },
  
      validateOnChange: true
  
    });
  
    const hasChanged = useMemo(() => formik.values.name !== data?.name,
     [data, formik.values.name]
    )
    
    return <form
    onSubmit={formik.handleSubmit}
    className="pb-2 w-full flex flex-row space-x-2 max-w-sm">
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