import clsx from "clsx";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { useCallback, useEffect, useState } from "react";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { NoteUpdateSectionMutation } from "./__generated__/NoteUpdateSectionMutation.graphql";


export const NoteUpdateSectionDataFragmentTag = graphql`
  fragment NoteUpdateSectionDataFragment on GQL_Note 
  {
    id
    content
  }
`;

const NoteUpdateSectionutationTag = graphql`
  mutation NoteUpdateSectionMutation($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      ... on UpdateNotePayload {          
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

type NoteUpdateSectionProps = {
  dataRef:NoteDataFragment$key | null;
}

export default function NoteUpdateSection({dataRef}:NoteUpdateSectionProps){

    const { id }: any = useParams<string>();
    
    const [note_id] = useState(id)

    const data = useFragment(NoteUpdateSectionDataFragmentTag, dataRef);
    
    const [
      commit,
      isInFlight,
    ] = useMutation<NoteUpdateSectionMutation>(NoteUpdateSectionutationTag);

    const toast = useToast();

    const [editor] = useLexicalComposerContext()

    const [hasChanged, setUpdated] = useState(false)
    
    useEffect(() => {
      editor.registerUpdateListener(({editorState}) => {
        setUpdated(true)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdate = useCallback(
      () => {
        !isInFlight &&
          commit({
            variables: {
              input: {
                noteId: note_id,
                data: JSON.stringify(editor.getEditorState()),
              }
            },
  
            onError(error) {
              toast?.pushError("Failed to process mutation");
              console.log(error);
            },
  
            onCompleted(response) {},
  
            updater(store, response) {
              if(response?.updateNote?.gQL_Note){
                setUpdated(false)
              }
              HandleErrors(toast, response?.updateNote?.errors);
            },
  
          });
      },
      [isInFlight,toast,note_id,commit,editor],
    )
    
    return <div className="h-full">
      <StayledButton 
        onClick={handleUpdate}
        isloading={isInFlight} 
        size="auto"
        onMobileIconOnly={false}
        variant="secondaryblue"
        iconRight={faFloppyDisk}
        disabled={!hasChanged}
        type="submit">
        Save
      </StayledButton>
  </div>
}