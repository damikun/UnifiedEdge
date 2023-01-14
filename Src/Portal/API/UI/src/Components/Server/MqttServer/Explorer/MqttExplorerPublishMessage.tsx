import clsx from "clsx";
import { useFormik } from "formik";
import * as monaco from "monaco-editor";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { AnimatePresence, motion } from "framer-motion";
import { mqttExplorerData } from "./MqttServerExplorer";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import Section from "../../../../UIComponents/Section/Section";
import TableItem from "../../../../UIComponents/Table/TableItem";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import InfinityScrollBody from "../../../../UIComponents/Table/InfinityScrollBody";
import { faPaperPlane, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import FormSelect, { FormSelectOption } from "../../../../UIComponents/Form/FormSelect";
import { Suspense, useCallback, useEffect, useMemo, useState,useTransition } from "react";
import { useFragment, useLazyLoadQuery, useMutation, usePaginationFragment } from "react-relay";
import { MqttExplorerPublishMessageQuery } from "./__generated__/MqttExplorerPublishMessageQuery.graphql";
import { MqttExplorerPublishMessageMutation, PublishMqttMessageInput } from "./__generated__/MqttExplorerPublishMessageMutation.graphql";
import { MqttExplorerPublishMessageTemplateRemoveMutation } from "./__generated__/MqttExplorerPublishMessageTemplateRemoveMutation.graphql";
import { MqttExplorerPublishMessageStoredTemplateItemDataFragment$key } from "./__generated__/MqttExplorerPublishMessageStoredTemplateItemDataFragment.graphql";
import { MqttExplorerPublishMessageStoredTemplatesPaginationFragment$key } from "./__generated__/MqttExplorerPublishMessageStoredTemplatesPaginationFragment.graphql";
import { MqttExplorerPublishMessageSaveTemplateMutation, SaveMqttExplorerMessageTemplateInput } from "./__generated__/MqttExplorerPublishMessageSaveTemplateMutation.graphql";
import { MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery } from "./__generated__/MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery.graphql";



const editor_options = {
  selectOnLineNumbers: true,
  automaticLayout: true,
  readOnly: false,
  formatOnPaste: true,
  formatOnType: true,
  scrollBeyondLastLine:false
};

loader.config({ monaco });

const json_default = `{
  "Measurement": 10
}`

const MqttExplorerPublishMessageQueryTag = graphql`
  query MqttExplorerPublishMessageQuery($server_uid:ID!) {
    ...MqttExplorerPublishMessageStoredTemplatesPaginationFragment@arguments(server_uid:$server_uid)
  }
`;

export const MqttExplorerPublishMessageStoredTemplatesPaginationFragment = graphql`
  fragment MqttExplorerPublishMessageStoredTemplatesPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery") {
    __id
    mqttExplorerStoredTemplates(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttExplorerPublishMessageStoredTemplatesPaginationFragmentConnection_mqttExplorerStoredTemplates") {
      __id
      edges {
        node {
          id
          ...MqttExplorerPublishMessageStoredTemplateItemDataFragment
        }
      }
    }
  }
`;


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


const MqttExplorerPublishMessageSaveTemplateMutationTag = graphql`
  mutation MqttExplorerPublishMessageSaveTemplateMutation(
    $input: SaveMqttExplorerMessageTemplateInput!
    $connections: [ID!]!
    ) {
      saveMqttExplorerMessageTemplate(input: $input) {
      ... on SaveMqttExplorerMessageTemplatePayload{
        gQL_MqttMessageTemplate
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttMessageTemplate"
          ){
          id
          ...MqttExplorerPublishMessageStoredTemplateItemDataFragment
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
  
  const data = useLazyLoadQuery<MqttExplorerPublishMessageQuery>(
    MqttExplorerPublishMessageQueryTag,
    {
      server_uid:server_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttExplorerPublishMessageModalKey"
    },
  );

  const pagination = usePaginationFragment<
  MqttExplorerPublishMessageStoredTemplatesPaginationFragmentRefetchQuery,
  MqttExplorerPublishMessageStoredTemplatesPaginationFragment$key
  >(MqttExplorerPublishMessageStoredTemplatesPaginationFragment, data);
  
  const [
    commit_publish,
    isInFlight_publish,
  ] = useMutation<MqttExplorerPublishMessageMutation>(
    MqttExplorerPublishMessageMutationTag
  );

  const [
    commit_save,
    isInFlight_save,
  ] = useMutation<MqttExplorerPublishMessageSaveTemplateMutation>(
    MqttExplorerPublishMessageSaveTemplateMutationTag
  );

  const addMessages = useSetRecoilState(mqttExplorerData(server_id));

  const modalCtx = useModalContext();
  
  const toast = useToast();

  const monaco_editor = useMonaco();

  const formik_publish = useFormik<PublishMqttMessageInput>({
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
          monaco_editor ?monaco_editor.editor.getModelMarkers({}).length ===0 :false,
            "Syntax error")
        ],
      });
    },

    validateOnChange: true

  });
  
  
  const formik_template = useFormik<SaveMqttExplorerMessageTemplateInput>({
    initialValues: {
      name:"",
      topic:formik_publish.values.topic,
      contentType:formik_publish.values.contentType,
      payload:formik_publish.values.payload,
      qos:formik_publish.values.qos,
      retain:formik_publish.values.retain,
      server_uid:formik_publish.values.server_uid,
      expireInterval:formik_publish.values.expireInterval,
    },

    onSubmit: async (values) => {

        await formik_publish.validateForm(formik_publish.values)
        !isInFlight_save && formik_publish.isValid &&
        commit_save({
          variables: {
            input: {
              name:values.name,
              topic:formik_publish.values.topic,
              contentType:formik_publish.values.contentType,
              payload:formik_publish.values.payload,
              qos:formik_publish.values.qos,
              retain:formik_publish.values.retain,
              server_uid:formik_publish.values.server_uid,
              expireInterval:formik_publish.values.expireInterval,
            },
            connections: pagination.data.mqttExplorerStoredTemplates?.__id ?
              [pagination.data.mqttExplorerStoredTemplates?.__id] : []
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.saveMqttExplorerMessageTemplate?.gQL_MqttMessageTemplate?.id){
              formik_template.resetForm();
            }

            HandleErrors(toast, response?.saveMqttExplorerMessageTemplate?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        name: [
          is.required(),
          is.minLength(2),
        ],
      });
    },

    validateOnChange: true

  });

  const [showEditor, setShowEditor] = useState(false);

  const handleEditorChange = useCallback(
    (value:string | undefined) => {
      formik_publish.setFieldValue("payload",value ?? "")
    },
    [formik_publish],
  )
  
  const lang = useMemo(() =>{
    return formik_publish.values.contentType === "JSON"?"json":"plaintext";
  }, [formik_publish.values.contentType])

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
      formik_publish.setFieldValue("retain",checked)
    },
    [formik_publish],
  )
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )

  const handleTemplateSelect = useCallback(
    (data:PublishMqttMessageInput) => {
      formik_publish.setValues(data)
    },
    [formik_publish]
  );

  const hasChanged = useMemo(() => formik_template.values.name !== "" ,
  [formik_template.values.name]
  )

  return <ModalContainer label="Publish Message">
    <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
      <form onSubmit={formik_publish.handleSubmit} 
        className="flex flex-col space-y-5 max-w-2xl md:w-96">

        <FormInput
          label="Topic"
          id="topic"
          error={formik_publish.errors.topic}
          value={formik_publish.values.topic}
          focusOnMount
          disabled={isInFlight_publish}
          onChange={formik_publish.handleChange}
        />

        <div className="flex flex-row space-x-5">

        <FormSelect
          label="Content-Type"
          id="contentType"
          error={formik_publish.errors.contentType}
          value={formik_publish.values.contentType}
          onChange={formik_publish.handleChange}
        >
          <FormSelectOption value="JSON">Json</FormSelectOption>
          <FormSelectOption value="TEXT">Text</FormSelectOption>
        </FormSelect>

        <FormSelect
          label="QoS"
          id="qos"
          error={formik_publish.errors.qos}
          value={formik_publish.values.qos}
          onChange={formik_publish.handleChange}
        >
          <FormSelectOption value="AT_MOST_ONCE">At most once</FormSelectOption>
          <FormSelectOption value="AT_LEAST_ONCE">At least once</FormSelectOption>
          <FormSelectOption value="EXACTLY_ONCE">Exactly once</FormSelectOption>
        </FormSelect>

        <FormSwitch
          id="retain"
          label="Retain"
          uncheckedColor="bg-red-500"
          checked={formik_publish.values.retain}
          onChange={handleRetainChange}
        />
        </div>

        <FieldSection variant="flex-col" name="Message">
          <AnimatePresence>
            <div className={clsx("flex h-96 w-full relative border",
            "bg-white rounded-md border",
            formik_publish.errors.payload
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
                  value={formik_publish.values.payload}
                  defaultValue={formik_publish.values.payload}
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
      <div className="flex flex-col h-full">

      <form onSubmit={formik_template.handleSubmit} 
        className="flex flex-row space-x-5 max-w-2xl md:w-96">

        <FormInput
          label="Template name (save)"
          id="name"
          error={formik_template.errors.name}
          value={formik_template.values.name}
          disabled={isInFlight_publish}
          onChange={formik_template.handleChange}
          afterFieldComponent={
            hasChanged && <StayledButton 
            isloading={isInFlight_save} 
            className="mt-auto"
            type="submit">
              Save
            </StayledButton>
          }
        />
      </form>

      <Section 
        // name="Templates"
        component={
          <InfinityScrollTable className="bg-white"
          > 
            <InfinityScrollBody
              className="bg-white"
              height="h-96"
              onEnd={handleLoadMore}
              >
                {
                  pagination?.data?.mqttExplorerStoredTemplates?.edges?.map((edge,index)=>{

                  if(edge === null || edge === undefined){
                    return <></>
                  }

                  return <MqttAuthClientItem 
                    dataRef={edge.node}
                    serverId={server_id}
                    key={edge.node?.id??index}
                    onItemClick={handleTemplateSelect}
                    connectionId={pagination.data.mqttExplorerStoredTemplates?.__id}
                  />
                })
              }
            </InfinityScrollBody>
          </InfinityScrollTable>
        }
        />
      </div>
      </div>
    
  </ModalContainer>
}


const MqttExplorerPublishMessageStoredTemplateItemDataFragment = graphql`
  fragment MqttExplorerPublishMessageStoredTemplateItemDataFragment on GQL_MqttMessageTemplate {
    id
    name
    payload
    qoS
    retain
    topic
    contentType
    expireInterval
  }
`;


const MqttExplorerPublishMessageTemplateRemoveMutationTag = graphql`
  mutation MqttExplorerPublishMessageTemplateRemoveMutation(
    $input: RemoveMqttServerExplorerUserTemplateInput!,
    $connections: [ID!]!
    ) {
      removeMqttServerExplorerUserTemplate(input: $input) {
      ... on RemoveMqttServerExplorerUserTemplatePayload {
        gQL_MqttMessageTemplate{
          id @deleteEdge(connections: $connections)
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

type MqttAuthClientItemProps = {
  dataRef: MqttExplorerPublishMessageStoredTemplateItemDataFragment$key | null;
  onItemClick: (data:PublishMqttMessageInput)=>void
  connectionId: string|null|undefined
  serverId:string
}

export function MqttAuthClientItem({
  dataRef,
  onItemClick,
  connectionId,
  serverId
}:MqttAuthClientItemProps){

  const data = useFragment(MqttExplorerPublishMessageStoredTemplateItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
    busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick({
          contentType:data.contentType,
          expireInterval: data.expireInterval ??0,
          payload: data.payload??"",
          qos: data.qoS,
          retain: data.retain,
          server_uid: serverId,
          topic: data.topic??""
        })
      });
    },
    [onItemClick,data,serverId],
  )

  const [
    commit_remove,
    isInFlight_remove,
  ] = useMutation<MqttExplorerPublishMessageTemplateRemoveMutation>(
    MqttExplorerPublishMessageTemplateRemoveMutationTag
  );

  const toast = useToast();

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation();

      return data?.id && !isInFlight_remove  && commit_remove({
        variables: {
          input: {
            template_id:data?.id as string
          },
          connections:connectionId ?[connectionId]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeMqttServerExplorerUserTemplate?.gQL_MqttMessageTemplate){
            // ...
          }
          HandleErrors(toast, response?.removeMqttServerExplorerUserTemplate?.errors);
        },

      });
    },
    [isInFlight_remove,data?.id,commit_remove,toast,connectionId]
  );

  return <TableItem
    className="bg-white bg-opacity-50 justify-between"
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.name}
      </div>
    </td>
    <td className="w-6">
      <div onClick={handleRemove} className={clsx("w-5 h-5 rounded-full",
        "items-center justify-center bg-gray-400 leading-none",
        "shadow-md hover:scale-105 flex transition duration-300",
        "hover:bg-red-500 p-0.5")}>
        <FontAwesomeIcon 
          spin={isInFlight_remove}
          className="text-white flex m-auto" 
          icon={isInFlight_remove? faSpinner : faTimes} />
      </div>
    </td>
  </TableItem>
}