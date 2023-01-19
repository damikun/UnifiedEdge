import clsx from "clsx";
import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { useNavigate } from "react-router";
import { useCallback, useTransition } from "react";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../../Layout/PageContainer";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { FormSwitch } from "../../../UIComponents/Form/FormSwitch";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import TextEditor, { TextEditorCtx } from "../../../UIComponents/TextEditor/UniversalEditor";
import { CreateNoteInput, NewNoteMutation } from "./__generated__/NewNoteMutation.graphql";


export const NewNoteMutationTag = graphql`
mutation NewNoteMutation(
  $input: CreateNoteInput!
  $connections: [ID!]!
  ) {
    createNote(input: $input) {
    ... on CreateNotePayload {
    gQL_Note @prependNode(
    connections: $connections
    edgeTypeName: "GQL_Note"
    ){
        id
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

export default function NewNote(){
  
  return <PageContainer  reservefooterSpace>
    <TextEditorCtx>
      <NewNoteForm/>
    </TextEditorCtx>
  </PageContainer>
}

function NewNoteForm(){

    const [editor] = useLexicalComposerContext()

    const toast = useToast();
    
    const [
      commit,
      isInFlight,
    ] = useMutation<NewNoteMutation>(
      NewNoteMutationTag
    );

    const navigate = useNavigate();

    //@ts-ignore
    const [_, startTransition] = useTransition({
        busyDelayMs: 2000,
    });

    const handleNavigate = useCallback(
        () => {

            startTransition(() => {
                navigate("/Documents")
            });
        },
        [navigate],
      )

    const formik = useFormik<CreateNoteInput>({
        initialValues: {
        data: JSON.stringify(editor.getEditorState()),
        isPrivate:false,
        name:""
      },

      onSubmit: async (values) => {
          !isInFlight &&
          commit({
          variables: {
              input: {
              data: JSON.stringify(editor.getEditorState()),
              name:values.name,
              isPrivate:values.isPrivate
              },
              connections: [] ?? [],
          },

          onError(error) {
              toast?.pushError("Failed to process mutation");
              console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
              if(response?.createNote?.gQL_Note){
                handleNavigate();
              }

              HandleErrors(toast, response?.createNote?.errors);
          },

          });

      },

      validate: (values) => {
      return generateErrors(values, {
          name: [
          is.required(),
          is.minLength(3),
          ],
      });
      },

      validateOnChange: false
    });
  
    const handlePrivate = useCallback(
      (
        id: string | undefined,
        checked: boolean,
        value: string | undefined,
        name: string | undefined
      ) => {
        formik.setFieldValue("isPrivate",checked)
      },
      [formik],
    )

    return <>
      <form onSubmit={formik.handleSubmit} 
        className={clsx("flex h-full flex-row space-x-3 md:space-x-5",
        "items-center")}>
        <FormInput
          label="Name"
          id="name"
          focusOnMount
          disabled={false}
          error={formik.errors.name}
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <FormSwitch
          id="isPrivate"
          label="Private"
          uncheckedColor="bg-gray-300"
          checked={formik.values.isPrivate}
          onChange={handlePrivate}
        />

        <div className="h-full mt-auto mb-2">
          <StayledButton 
          isloading={isInFlight} 
          size="medium"
          onMobileIconOnly={false}
          variant="secondaryblue"
          iconRight={faFloppyDisk}
          type="submit">
            Save
          </StayledButton>
        </div>
      
      </form>
      <TextEditor/>
    </>
}