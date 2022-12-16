import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { CLIENT_PARAM_NAME } from "./MqttAuthClients";
import { useCallback, useMemo, useState } from "react";
import { GetLocalDate } from "../../../../../Shared/Common";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useMqttAuthClientsCtx } from "./MqttAuthClientsCtxProvider";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useModalContext } from "../../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttAuthClientDetailQuery } from "./__generated__/MqttAuthClientDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttAuthClientDetailEnableMutation } from "./__generated__/MqttAuthClientDetailEnableMutation.graphql";
import { MqttAuthClientDetailRemoveMutation } from "./__generated__/MqttAuthClientDetailRemoveMutation.graphql";


const MqttAuthClientDetailTag = graphql`
  query MqttAuthClientDetailQuery($authClient_id:ID!) {
    mqttAuthClientById(authClient_id: $authClient_id) {
      clientId
      enabled
      id
      lastAuthenticate
      rules{
        authAction
        mqttAction
        topic
        id
      }
    }
  }
`;

const MqttAuthClientDetailEnableMutationTag = graphql`
  mutation MqttAuthClientDetailEnableMutation(
    $input: EnableMqttAuthClinetInput!
    ) {
      enableMqttAuthClinet(input: $input) {
      ... on EnableMqttAuthClinetPayload {
        gQL_MqttAuthClient{
          clientId
          enabled
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

const MqttAuthClientDetailRemoveMutationTag = graphql`
  mutation MqttAuthClientDetailRemoveMutation(
    $input: RemoveMqttAuthClientInput!,
    $connections: [ID!]!
    ) {
      removeMqttAuthClient(input: $input) {
      ... on RemoveMqttAuthClientPayload {
        gQL_MqttAuthClient{
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

export default function MqttAuthClientDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [client_id] = useState(searchParams.get(CLIENT_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttAuthClientDetailQuery>(
    MqttAuthClientDetailTag,
    {
      authClient_id:client_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttAuthClientDetailFetchKey"
    },
  );

  const [
    commit_checked,
    isInFlight_checked,
  ] = useMutation<MqttAuthClientDetailEnableMutation>(
    MqttAuthClientDetailEnableMutationTag
  );

  const [
    commit_remove,
    isInFlight_remove,
  ] = useMutation<MqttAuthClientDetailRemoveMutation>(
    MqttAuthClientDetailRemoveMutationTag
  );

  const modalCtx = useModalContext();
  
  const toast = useToast();

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight_checked  && commit_checked({
        variables: {
          input: {
            authClient_id: client_id as string,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttAuthClinet?.gQL_MqttAuthClient){
            // ...
          }
          HandleErrors(toast, response?.enableMqttAuthClinet?.errors);
        },

        optimisticUpdater(store){

          if(client_id){
            var hook = store.get(client_id);

            hook?.setValue(checked,"enabled")
          }
        }

      });
    },
    [
      isInFlight_checked,
      client_id,
      commit_checked,
      toast
    ]
  );

  const ctx = useMqttAuthClientsCtx();
  
  const handleRemove = useCallback(
    () => {

      return !isInFlight_remove  && commit_remove({
        variables: {
          input: {
            authClientId: client_id as string
          },
          connections: ctx?.connection_id ? [ctx?.connection_id]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeMqttAuthClient?.gQL_MqttAuthClient){
            modalCtx.close()
          }
          HandleErrors(toast, response?.removeMqttAuthClient?.errors);
        },
      });
    },
    [isInFlight_remove,
      client_id,
      commit_remove,
      toast,
      ctx.connection_id,
      modalCtx
    ]
  );
  
  const dt = useMemo(()=>{
    return GetLocalDate(data?.mqttAuthClientById.lastAuthenticate);
  },[data]) 
  
  return <ModalContainer label="Client detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      <FieldGroup>
        <FieldSection multiline name="ClientId">
            <div className={clsx("font-sans text-gray-700 font-semibold",
            "text-sm max-w-full break-all select-all capitalize")}>
                {data?.mqttAuthClientById.clientId}
            </div>
        </FieldSection>
        <FieldSection multiline name="Enable">
            <div className={clsx("font-sans text-gray-700 font-semibold",
            "text-sm max-w-full break-all select-all")}>
                <FormSwitch
                  id={"active"}
                  checked={data?.mqttAuthClientById.enabled}
                  onChange={handleCheckedEvent}
                />
            </div>
        </FieldSection>
        <FieldSection name="Last trigger">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {dt}
          </div>
        </FieldSection>
      </FieldGroup>

      <FieldDivider/>

      <FieldSection multiline name="Delete">
        <div className="max-w-lg">
          <StayledButton
            variant="error"
            isloading={isInFlight_remove}
            iconLeft={faTrash}
            size="normal"
            onClick={handleRemove}>
              Remove
          </StayledButton>
        </div>
      </FieldSection>
    </div>
  </ModalContainer>
}