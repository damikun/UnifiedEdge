import clsx from "clsx";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { EVENT_GROUPS } from "./WebHookGroups";
import { URL_REGEX } from "../../../constants";
import { graphql } from "babel-plugin-relay/macro";
import { useWebHookListCtx } from "./WebHookListCtxProvider";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { FormSwitch } from "../../../UIComponents/Form/FormSwitch";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { WebHookCreateQuery } from "./__generated__/WebHookCreateQuery.graphql";
import { useLazyLoadQuery, useMutation, usePaginationFragment } from "react-relay";
import FormSelect, { FormSelectOption } from "../../../UIComponents/Form/FormSelect";
import { CreateWebHookInput, WebHookCreateMutation } from "./__generated__/WebHookCreateMutation.graphql";
import { WebHookCreateServerListFragment$key } from "./__generated__/WebHookCreateServerListFragment.graphql";
import { WebHookCreate_ServerListRefetchQuery } from "./__generated__/WebHookCreate_ServerListRefetchQuery.graphql";



const WebHookCreateQueryTag = graphql`
  query WebHookCreateQuery{
    ...WebHookCreateServerListFragment
  }
`;

const CreateWebhookServerListTag = graphql`
  fragment WebHookCreateServerListFragment on Query 
  @argumentDefinitions(
    first: { type: Int, defaultValue:100 }
    after: { type: String }
  ) @refetchable(queryName: "WebHookCreate_ServerListRefetchQuery") {
    servers(
      first: $first   
      after: $after
    ) @connection(key: "WebHookCreate_ServerList_Connection_servers"){
      __id
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          type
        }
      }
    }
  }
`;

const WebHookCreateMutationTag = graphql`
  mutation WebHookCreateMutation(
    $input: CreateWebHookInput!
    $connections: [ID!]!
    ){
    createWebHook(input: $input) {
      ... on CreateWebHookPayload {
        gQL_WebHook    
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_WebHook"
          ){
            ...WebHookListItemDataFragment
        }
      }
    }
  }`


export default React.memo(CreateNewWebHook)

function CreateNewWebHook(){

  const data = useLazyLoadQuery<WebHookCreateQuery>(
    WebHookCreateQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
    },
  );

  const servers = usePaginationFragment<
    WebHookCreate_ServerListRefetchQuery,
    WebHookCreateServerListFragment$key
  >(CreateWebhookServerListTag, data);

  const [
    commit,
    isInFlight,
  ] = useMutation<WebHookCreateMutation>(WebHookCreateMutationTag);

  const conCtx = useWebHookListCtx();

  const toast = useToast();

  const modalCtx = useModalContext();
  
  const formik = useFormik<CreateWebHookInput>({
    initialValues: {
      url: "",
      secret: "",
      groups: [],
      server_id:null,
      name:""
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              url: values.url,
              secret: values.secret,
              groups: values.groups,
              name:values.name,
              server_id:values.server_id
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.createWebHook.gQL_WebHook){
              modalCtx?.close();
            }
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        url: [
          is.required(),
          is.minLength(5),
          is.match(() => {
            return values.url.match(URL_REGEX);
          }, "Invalid URL format"),
        ],
        secret: [],
        groups: [
          is.required()
        ],
        name: [
          is.required(),
          is.minLength(3),
        ],
      });
    },

    validateOnChange: false

  });


  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      if(id){
        if(!checked){
          formik.setFieldValue("groups",formik.values.groups.filter(e=>e !== id))
        }else{
          formik.setFieldValue("groups",[id,...formik.values.groups])
        }
      }
    },
    [formik]
  );

  const isChecked = useCallback(
    (id:string) => {
      return formik.values.groups.find(e=>e ===id) !== undefined
    },
    [formik.values.groups],
  )
  
  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full space-y-2">
      
    <FormInput
      label="Name"
      id="name"
      focusOnMount
      disabled={isInFlight}
      error={formik.errors.name}
      value={formik.values.name}
      onChange={formik.handleChange}
    />

    <FormInput
      label="Url"
      id="url"
      disabled={isInFlight}
      error={formik.errors.url}
      value={formik.values.url}
      onChange={formik.handleChange}
    />

    <FormInput
      label="Secret"
      id="secret"
      type={"password"}
      disabled={isInFlight}
      error={formik.errors.secret}
      value={formik.values.secret??""}
      onChange={formik.handleChange}
    />

    <FormSelect
      label="Server"
      id="server"
      error={formik.errors.server_id}
      value={formik.values.server_id??undefined}
      onChange={formik.handleChange}
    >
      <FormSelectOption key="any" value={undefined} >Any</FormSelectOption>
      {
        servers.data.servers?.edges?.map((enity,index)=>{
          return <FormSelectOption
            key={index}
            value={enity.node?.id}>
              {enity.node?.name}
            </FormSelectOption>
        })
      }
    </FormSelect>

    <div className="flex flex-col w-full relative space-y-2 pb-10">
      <label className="font-semibold text-base">Trigger Group</label>
      {EVENT_GROUPS.map((enity,index) => (
        <div
          key={index}
          className={clsx(
            "flex flex-row w-full flex-nowrap justify-between",
            "items-center space-x-5"
          )}
        >
          <div className="flex flex-col w-9/12">
            <h6 className="font-bold text-base capitalize">
              {enity.id}
            </h6>
            <p className="text-base">
              {enity.description}
            </p>
          </div>
          
          <div className="flex w-3/12 items-start justify-start">
            <FormSwitch
              id={enity.id}
              checked={isChecked(enity.id)}
              label={enity.id}
              value={enity.id}
              name={enity.id}
              onChange={handleCheckedEvent}
            />
          </div>

        </div>
      ))}
    </div>

    <div className="mb-6 text-center h-10 flex-1">
      <StayledButton
        isloading={isInFlight}
        variant="secondaryblue"
        disabled={isInFlight}
        className="flex-1 my-auto w-full"
        type="submit"
      >
        <div className="mx-auto my-auto">
          Create
        </div>
      </StayledButton>
    </div>
  </form>
}