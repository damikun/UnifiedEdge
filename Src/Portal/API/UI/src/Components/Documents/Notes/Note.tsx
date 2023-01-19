import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../../Layout/PageContainer";
import { useFragment, useLazyLoadQuery } from "react-relay";
import { NoteQuery } from "./__generated__/NoteQuery.graphql";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import TextEditor, { TextEditorCtx } from "../../../UIComponents/TextEditor/UniversalEditor";


const NoteQueryTag = graphql`
    query NoteQuery($note_id:ID!) {
        noteById(note_id:$note_id) {
            id
            ...NoteDataFragment
        }
    }
`;

export const NoteDataFragmentTag = graphql`
  fragment NoteDataFragment on GQL_Note 
  {
    id
    name
    content
    isHighlighted
    isPrivate
    updated
    updatedby{
        firstName
        lastName
        userName
    }
  }
`;

export default function Note(){

    const { id }: any = useParams<string>();
    
    const [note_id] = useState(id)

    const data = useLazyLoadQuery<NoteQuery>(
        NoteQueryTag,
        {note_id:note_id},
        {
            fetchPolicy: "store-and-network",
            UNSTABLE_renderPolicy: "partial"
        },
    );

    return <PageContainer  reservefooterSpace>
    <TextEditorCtx>
      <NoteEditor dataRef={data.noteById}/>
    </TextEditorCtx>
  </PageContainer>
}

type NoteEditorProps = {
    dataRef:NoteDataFragment$key | null;
}

const EMPTY = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

function NoteEditor({dataRef}:NoteEditorProps){

    const data = useFragment(NoteDataFragmentTag, dataRef);

    const [editor] = useLexicalComposerContext()

    useEffect(() => {
      try{
        editor.setEditorState(editor.parseEditorState(data?.content??""));
      }catch{
        editor.setEditorState(editor.parseEditorState(EMPTY));
      }
    }, [])
    
    return <>
        <div
        className={clsx("flex h-full flex-row space-x-3 md:space-x-5",
        "items-center")}>
            {data?.name}
        </div>
        <TextEditor/>
    </>
}