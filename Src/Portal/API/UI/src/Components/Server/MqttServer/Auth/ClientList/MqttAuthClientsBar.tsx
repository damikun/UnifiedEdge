import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import CreateMqttAuthClient from "./CreateMqttAuthClient";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { MqttAuthClientsBarEnableFragment$key } from "./__generated__/MqttAuthClientsBarEnableFragment.graphql";
import { MqttAuthClientsBarEnableAuthMutation } from "./__generated__/MqttAuthClientsBarEnableAuthMutation.graphql";


export const MqttAuthClientsBarEnableFragmentTag = graphql`
  fragment MqttAuthClientsBarEnableFragment on Query
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerAuthCfg(server_uid:$server_uid){
      id
      clientAuthEnabled
      userAuthEnabled
    }
  }
`;


export const MqttAuthClientsBarEnableAuthMutationTag = graphql`
mutation MqttAuthClientsBarEnableAuthMutation(
  $input: EnableMqttClientAuthInput!
  ) {
    enableMqttClientAuth(input: $input) {
    ... on EnableMqttClientAuthPayload {
      gQL_MqttAuthCfg{
        id
        clientAuthEnabled
        userAuthEnabled
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

type MqttAuthClientsBarProps = {
  dataRef: MqttAuthClientsBarEnableFragment$key | null;
}

export default function MqttAuthClientsBar({dataRef}:MqttAuthClientsBarProps){
  const [modalState, setModalState] = useState(false);

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  
  const data = useFragment(MqttAuthClientsBarEnableFragmentTag, dataRef);

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttAuthClientsBarEnableAuthMutation>(
    MqttAuthClientsBarEnableAuthMutationTag
  );

  const toast = useToast();

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            server_uid: server_id,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttClientAuth?.gQL_MqttAuthCfg){
            // ...
          }
          HandleErrors(toast, response?.enableMqttClientAuth?.errors);
        },

        optimisticUpdater(store){

          if(data?.mqttServerAuthCfg.id){
            var hook = store.get(data?.mqttServerAuthCfg.id);

            hook?.setValue(checked,"clientAuthEnabled")
          }
        }

      });
    },
    [
      isInFlight,
      server_id,
      commit,
      toast,
      data?.mqttServerAuthCfg.id
    ]
  );

  const handleClose = useCallback(
    () => {
      setModalState(false);
    },
    [],
  )
  
  const handleOpen = useCallback(
    () => {
      setModalState(true);
    },
    [], 
  )

  return <>
    <Modal
      isOpen={modalState}
      position="center"
      onClose={handleClose}>
      <ModalContainer label="Define client">
        <CreateMqttAuthClient />
      </ModalContainer>
    </Modal>

    <div className="flex flex-row space-x-3 items-center flex-nowrap">
      <StayledButton 
        onMobileIconOnly={false}
        variant="primaryblue"
        onClick={handleOpen}
        iconLeft={faPlus}>
          Add
      </StayledButton>

      <FormSwitch
        id={"enable_client_auth"}
        uncheckedColor="bg-red-500"
        checked={data?.mqttServerAuthCfg.clientAuthEnabled ?? false}
        onChange={handleCheckedEvent}
      />
    </div>
  </> 
}