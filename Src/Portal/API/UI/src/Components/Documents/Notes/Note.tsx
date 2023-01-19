import clsx from "clsx";
import { useParams } from "react-router-dom";
import NoteNameSection from "./NoteNameSection";
import { useLayoutEffect, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import NoteUpdateSection from "./NoteUpdateSection";
import PageContainer from "../../Layout/PageContainer";
import NoteHighlightSection from "./NoteHighlightSection";
import { useFragment, useLazyLoadQuery } from "react-relay";
import NoteVisibilitySection from "./NoteVisibilitySection";
import { NoteQuery } from "./__generated__/NoteQuery.graphql";
import { NoteDataFragment$key } from "./__generated__/NoteDataFragment.graphql";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import TextEditor, { EMPTY_EDITOR, TextEditorCtx } from "../../../UIComponents/TextEditor/UniversalEditor";


const NoteQueryTag = graphql`
    query NoteQuery($note_id:ID!) {
        noteById(note_id:$note_id) {
            id
            content
            ...NoteDataFragment
            ...NoteNameSectionDataFragment
            ...NoteVisibilitySectionDataFragment
            ...NoteHighlightSectionDataFragment
            ...NoteUpdateSectionDataFragment
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

// function ValidateState(state:string|null|undefined){

//   if(!state){
//     return EMPTY_EDITOR;
//   }
//     const editor = createEditor()
//   try{
//     editor.parseEditorState(state)
//     return state;
//   }catch{
//     return EMPTY_EDITOR;
//   }
//}

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

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // const init = useMemo(() => ValidateState(data.noteById.content), [])

    return <PageContainer reservefooterSpace>
    <TextEditorCtx>
      <NoteEditor dataRef={data.noteById}/>
    </TextEditorCtx>
  </PageContainer>
}

type NoteEditorProps = {
    dataRef:NoteDataFragment$key | null;
}

function NoteEditor({dataRef}:NoteEditorProps){

    const data = useFragment(NoteDataFragmentTag, dataRef);

    const [editor] = useLexicalComposerContext()

    useLayoutEffect(() => {

      if(!data?.content){
        editor.setEditorState(editor.parseEditorState(EMPTY_EDITOR));
      }else{
        try{
          editor.setEditorState(editor.parseEditorState(data?.content??""));
        }catch{
          editor.setEditorState(editor.parseEditorState(EMPTY_EDITOR));
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <div className="w-full flex flex-col max-w-6xl mx-auto space-y-2">
    <div
      className={clsx("flex h-full flex-col md:flex-row md:space-x-5",
      "md:items-center justify-end md:justify-between")}>
      <NoteNameSection dataRef={dataRef} />
      <div className="flex">
        <div className="flex flex-row space-x-5">
          <NoteHighlightSection dataRef={dataRef} />
          <NoteVisibilitySection dataRef={dataRef} />
          <NoteUpdateSection dataRef={dataRef} />
        </div>
      </div>
    </div>
    <TextEditor/>
  </div>
}