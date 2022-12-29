import clsx from "clsx";
import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { AnimatePresence, motion } from "framer-motion";
import { mqttExplorerData } from "./MqttServerExplorer";
import Editor, { useMonaco } from "@monaco-editor/react";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import { Suspense, useCallback, useEffect, useMemo, useState, } from "react";
import FormSelect, { FormSelectOption } from "../../../../UIComponents/Form/FormSelect";
import { MqttExplorerPublishMessageMutation, PublishMqttMessageInput } from "./__generated__/MqttExplorerPublishMessageMutation.graphql";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";


const editor_options = {
  selectOnLineNumbers: true,
  automaticLayout: true,
  readOnly: false,
  formatOnPaste: true,
  formatOnType: true,
  scrollBeyondLastLine:false
};

const json_default = `{
  "Measurement": 10
}`

const MqttExplorerPublishMessageMutationTag = graphql`
  mutation MqttExplorerPublishMessageMutation(
    $input: PublishMqttMessageInput!
    ) {
      publishMqttMessage(input: $input) {
      ... on PublishMqttMessagePayload {
        gQL_MqttMessage{
          id
          contentType
          topic
          isJsonPayload
          isTextPayload
          isXmlPayload
          payload
          timeStamp
          payloadUtf8Str
          qos
          retain
          clientId
          dup
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

export default function MqttExplorerPublishMessage(){

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  
  const [
    commit_publish,
    isInFlight_publish,
  ] = useMutation<MqttExplorerPublishMessageMutation>(
    MqttExplorerPublishMessageMutationTag
  );

  const addMessages = useSetRecoilState(mqttExplorerData(server_id));

  const modalCtx = useModalContext();
  
  const toast = useToast();

  const monaco = useMonaco();

  const formik = useFormik<PublishMqttMessageInput>({
    initialValues: {
      topic:"some/topic",
      contentType:"JSON",
      payload:json_default,
      qos:"AT_LEAST_ONCE",
      retain:false,
      server_uid:server_id,
      expireInterval:0
    },

    onSubmit: async (values) => {
        !isInFlight_publish &&
        commit_publish({
          variables: {
            input: {
              topic: values.topic,
              server_uid: values.server_uid,
              contentType:values.contentType,
              payload:values.payload,
              qos:values.qos,
              retain:values.retain,
              expireInterval:values.expireInterval
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.publishMqttMessage?.gQL_MqttMessage?.id){
              modalCtx?.close();

              addMessages([{
                type:"out",
                message:response?.publishMqttMessage?.gQL_MqttMessage
              }])
            }

            HandleErrors(toast, response?.publishMqttMessage?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        topic: [
          is.required(),
          is.minLength(1),
        ],
        payload: [
          is.required(),
          is.match(()=> 
            monaco ?monaco.editor.getModelMarkers({}).length ===0 :false,
            "Syntax error")
        ],
      });
    },

    validateOnChange: true

  });
  
  const [showEditor, setShowEditor] = useState(false);

  const handleEditorChange = useCallback(
    (value:string | undefined) => {
      formik.setFieldValue("payload",value ?? "")
    },
    [formik],
  )
  
  const lang = useMemo(() =>{
    return formik.values.contentType === "JSON"?"json":"plaintext";
  }, [formik.values.contentType])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEditor(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);
  
  const handleRetainChange = useCallback(
    (
      id: string | undefined,
      checked: boolean,
      value: string | undefined,
      name: string | undefined
    ) => {
      formik.setFieldValue("retain",checked)
    },
    [formik],
  )
  
  return <ModalContainer label="Publish Message">
    <form onSubmit={formik.handleSubmit} 
      className="flex flex-col space-y-5 max-w-2xl md:w-96">

      <FormInput
        label="Topic"
        id="topic"
        error={formik.errors.topic}
        value={formik.values.topic}
        focusOnMount
        disabled={isInFlight_publish}
        onChange={formik.handleChange}
      />

      <div className="flex flex-row space-x-5">

      <FormSelect
        label="Content-Type"
        id="contentType"
        error={formik.errors.contentType}
        value={formik.values.contentType}
        onChange={formik.handleChange}
      >
        <FormSelectOption value="JSON">Json</FormSelectOption>
        <FormSelectOption value="TEXT">Text</FormSelectOption>
      </FormSelect>

      <FormSelect
        label="QoS"
        id="qos"
        error={formik.errors.qos}
        value={formik.values.qos}
        onChange={formik.handleChange}
      >
        <FormSelectOption value="AT_MOST_ONCE">At most once</FormSelectOption>
        <FormSelectOption value="AT_LEAST_ONCE">At least once</FormSelectOption>
        <FormSelectOption value="EXACTLY_ONCE">Exactly once</FormSelectOption>
      </FormSelect>

      <FormSwitch
        id="retain"
        label="Retain"
        uncheckedColor="bg-red-500"
        checked={formik.values.retain}
        onChange={handleRetainChange}
      />
      </div>

      <FieldSection variant="flex-col" name="Message">
        <AnimatePresence>
          <div className={clsx("flex h-96 w-full relative border",
          "bg-white rounded-md border",
          formik.errors.payload
          ? " border-red-500 "
          : clsx(
              "border-gray-300 focus-within:border-blue-500",
              "hover:border-blue-500"
            ))}>
          <Suspense>
            {
              showEditor && <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1}}
              transition={{duration:0.3}}
              className="w-full hfull"
              >
              <Editor
                className="px-2 flex-1"
                height='100%'
                theme="vs-light"
                defaultLanguage="json"
                language={lang}
                options={editor_options}
                line={2}
                onChange={handleEditorChange}
                defaultValue={formik.values.payload}
              />
              </motion.div>
            }
          </Suspense>
          </div>
        </AnimatePresence>
      </FieldSection>

      <div className="w-full pt-5">
        <StayledButton
          isloading={isInFlight_publish}
          variant="secondaryblue"
          disabled={isInFlight_publish}
          className="flex-1 my-auto w-full"
          type="submit"
          size="medium"
          iconLeft={faPaperPlane}
        >
          Publish
        </StayledButton>
      </div>
    </form>
  </ModalContainer>
}