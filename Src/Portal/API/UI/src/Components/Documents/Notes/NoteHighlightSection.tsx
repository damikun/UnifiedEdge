import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { NoteHighlightSectionMutation } from "./__generated__/NoteHighlightSectionMutation.graphql";


export const NoteHighlightSectionDataFragmentTag = graphql`
  fragment NoteHighlightSectionDataFragment on GQL_Note 
  {
    id
    isHighlighted
  }
`;

const NoteHighlightSectionutationTag = graphql`
  mutation NoteHighlightSectionMutation($input: HighlightNoteInput!) {
    highlightNote(input: $input) {
      ... on HighlightNotePayload {          
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

type NoteHighlightSectionProps = {
  dataRef:NoteDataFragment$key | null;
}

export default function NoteHighlightSection({dataRef}:NoteHighlightSectionProps){

    const { id }: any = useParams<string>();
    
    const [note_id] = useState(id)

    const data = useFragment(NoteHighlightSectionDataFragmentTag, dataRef);

    const [
      commit,
      isInFlight,
    ] = useMutation<NoteHighlightSectionMutation>(NoteHighlightSectionutationTag);

    const toast = useToast();

    const handleCheckedEvent = useCallback(
      () => {
  
        return !isInFlight  && commit({
          variables: {
            input: {
              noteId: note_id,
              highlight: !data?.isHighlighted,
            }
          },
  
          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },
  
          onCompleted(response) {},
  
          updater(store, response) {
            if(response?.highlightNote?.gQL_Note){
              // ...
            }
            HandleErrors(toast, response?.highlightNote?.errors);
          },
  
          optimisticUpdater(store){

            if(data?.id){
              var note = store.get(data?.id);
  
              note?.setValue(!data?.isHighlighted,"isHighlighted")
            }
          }
        });
      },
      [isInFlight,data?.id,data?.isHighlighted,commit,toast,note_id]
    );
  
    return <div
      className="pb-2 w-full flex flex-row space-x-2 max-w-2xl">
     <div className={clsx("flex flex-col",
      "justify-center")}>
        <label className="font-semibold text-base">
          Highlight
        </label>
        <div className={clsx(
          "flex flex-row my-auto justify-start align-middle",
          "content-center p-1 my-2 h-10 items-center",
          "justify-center")}>
          <FontAwesomeIcon
            onClick={handleCheckedEvent}
            className={clsx("cursor-pointer text-xl",
            "transition duration-300",
            data?.isHighlighted ?
            "text-red-500 hover:text-red-600":
            "text-gray-400 hover:text-gray-500")}
            icon={faFlag} />
        </div>
      </div>
    </div>
}