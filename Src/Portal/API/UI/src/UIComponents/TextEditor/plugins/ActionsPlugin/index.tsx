
import {
  $createTextNode,
  $getRoot,
  CLEAR_EDITOR_COMMAND,
} from 'lexical';
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from '@lexical/markdown';
import clsx from 'clsx';
import {useCallback} from 'react';
import {exportFile} from '@lexical/file';
import type {LexicalEditor} from 'lexical';
import useModal from '../../../Modal/useModal';
import StayledButton from '../../../Buttons/StayledButton';
import {$createCodeNode, $isCodeNode} from '@lexical/code';
import {PLAYGROUND_TRANSFORMERS} from '../MarkdownTransformers';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export default function ActionsPlugin({
  isRichText,
}: {
  isRichText: boolean;
}): JSX.Element {
  const [modal, showModal] = useModal({position:"top"});
  const [editor] = useLexicalComposerContext();

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === 'markdown') {
        $convertFromMarkdownString(
          firstChild.getTextContent(),
          PLAYGROUND_TRANSFORMERS,
        );
      } else {
        const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
        root
          .clear()
          .append(
            $createCodeNode('markdown').append($createTextNode(markdown)),
          );
      }
      root.selectEnd();
    });
  }, [editor]);

  return (
    <div className="actions">
      <button
        className="action-button export"
        onClick={() =>
          exportFile(editor, {
            fileName: `Playground ${new Date().toISOString()}`,
            source: 'Playground',
          })
        }
        title="Export"
        aria-label="Export editor state to JSON">
        <i className="export" />
      </button>
      <button
        className="action-button clear"
        onClick={() => {
          showModal('Clear editor', (onClose) => (
            <ShowClearDialog editor={editor} onClose={onClose} />
          ));
        }}
        title="Clear"
        aria-label="Clear editor contents">
        <i className="clear" />
      </button>
      <button
        className="action-button"
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
        aria-label="Convert from markdown">
        <i className="markdown" />
      </button>
      {modal}
    </div>
  );
}

function ShowClearDialog({
  editor,
  onClose,
}: {
  editor: LexicalEditor;
  onClose: () => void;
}): JSX.Element {

  const handkeClear = useCallback(
    () => {
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      editor.focus();
      onClose();
    },
    [editor,onClose],
  )

  const handleCancle = useCallback(
    () => {
      editor.focus();
      onClose();
    },
    [editor,onClose],
  )
  
  return (
    <div className='flex flex-col p-2 py-3 space-y-5'>
      <span className='py-2'>
        Are you sure you want to clear the editor?
      </span>
      <div className={clsx("flex flex-row space-x-2",
      "w-full justify-end")}>
        <StayledButton 
          onMobileIconOnly={false}
          variant="secondaryblue"
          size='medium'
          onClick={handkeClear}>
            Clear
        </StayledButton>
        <StayledButton 
          onMobileIconOnly={false}
          variant="secondarygray"
          size='medium'
          onClick={handleCancle}>
            Cancel
        </StayledButton>
      </div>
    </div>
  );
}