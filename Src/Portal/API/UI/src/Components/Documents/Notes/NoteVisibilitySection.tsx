import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { FormSwitch } from "../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { NoteVisibilitySectionMutation } from "./__generated__/NoteVisibilitySectionMutation.graphql";


export const NoteVisibilitySectionDataFragmentTag = graphql`
  fragment NoteVisibilitySectionDataFragment on GQL_Note 
  {
    id
    isPrivate
  }
`;

const NoteVisibilitySectionutationTag = graphql`
  mutation NoteVisibilitySectionMutation($input: SetNotePublicInput!) {
    setNotePublic(input: $input) {
      ... on SetNotePublicPayload {          
        gQL_Note{
          id
          ...NoteDataFragment
          ...NotesItemDataFragment
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


type NoteVisibilitySectionProps = {
  dataRef:NoteDataFragment$key | null;
}

export default function NoteVisibilitySection({dataRef}:NoteVisibilitySectionProps){

    const { id }: any = useParams<string>();
    
    const [note_id] = useState(id)

    const data = useFragment(NoteVisibilitySectionDataFragmentTag, dataRef);

    const [
      commit,
      isInFlight,
    ] = useMutation<NoteVisibilitySectionMutation>(NoteVisibilitySectionutationTag);

    const toast = useToast();

    const handleCheckedEvent = useCallback(
      (id: string | undefined,
      checked: boolean,
      value: string | undefined,
      name: string | undefined) => {
  
        return !isInFlight  && commit({
          variables: {
            input: {
              noteId: note_id,
              isPrivate: checked,
            }
          },
  
          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },
  
          onCompleted(response) {},
  
          updater(store, response) {
            if(response?.setNotePublic?.gQL_Note){
              // ...
            }
            HandleErrors(toast, response?.setNotePublic?.errors);
          },
  
          optimisticUpdater(store){

            if(data?.id){
              var note = store.get(data?.id);
  
              note?.setValue(checked,"isPrivate")
            }

          }
  
        });
      },
      [isInFlight,data?.id,commit,toast,note_id]
    );
  
    return <div
    className="pb-0 w-full flex flex-row space-x-2 max-w-2xl">
      <FormSwitch
        id={"isPrivate"}
        checked={data?.isPrivate ?? false}
        label={"Private"}
        onChange={handleCheckedEvent}
      />
    </div>
}