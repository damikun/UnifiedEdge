import Editor from './Editor';
import { useMemo } from 'react';
import { EditorState } from 'lexical';
import EditorNodes from './nodes/EditorNodes';
import { TableContext } from './plugins/TablePlugin';
import TextEditorTheme from './themes/EditorEditorTheme';
import {SettingsContext} from './context/SettingsContext';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {SharedHistoryContext} from './context/SharedHistoryContext';

import "./editor.css"

const defaultConfig = {
  editorState: null,
  namespace: 'TextEditor',
  nodes: [...EditorNodes],
  onError: (error: Error) => {
    throw error;
  },
  theme: TextEditorTheme,
};

export const EMPTY_EDITOR = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

type TextEditorCtxProps = {
  children:React.ReactNode
  editorState?: EditorState | string
}

export function TextEditorCtx({children,editorState}:TextEditorCtxProps){

  const init = useMemo(() => editorState?
  {
    editorState: null,
    namespace: 'TextEditor',
    nodes: [...EditorNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: TextEditorTheme,
  }:
  defaultConfig
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [])

  return (
    <SettingsContext>
      <LexicalComposer initialConfig={init}>
        <SharedHistoryContext>
          <TableContext>
            <>
              {children}
            </>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </SettingsContext>
  );
}

export default function TextEditor(): JSX.Element {
  return <div className='flex w-full h-auto'>
    <div className="editor-shell w-full flex flex-col h-auto">
      <Editor />
    </div>
  </div>
}