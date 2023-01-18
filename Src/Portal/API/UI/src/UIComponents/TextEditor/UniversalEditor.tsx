import Editor from './Editor';
import EditorNodes from './nodes/EditorNodes';
import { TableContext } from './plugins/TablePlugin';
import TextEditorTheme from './themes/EditorEditorTheme';
import {SettingsContext} from './context/SettingsContext';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {SharedHistoryContext} from './context/SharedHistoryContext';

import "./editor.css"

const initialConfig = {
  editorState: null,
  namespace: 'TextEditor',
  nodes: [...EditorNodes],
  onError: (error: Error) => {
    throw error;
  },
  theme: TextEditorTheme,
};

type TextEditorCtxProps = {
  children:React.ReactNode
}

export function TextEditorCtx({children}:TextEditorCtxProps){
  return (
    <SettingsContext>
      <LexicalComposer initialConfig={initialConfig}>
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