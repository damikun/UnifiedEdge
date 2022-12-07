import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import CreateMqttAuthUser from "./CreateMqttAuthUser";
import { useFragment, useMutation } from "react-relay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { MqttAuthUsersBarEnableFragment$key } from "./__generated__/MqttAuthUsersBarEnableFragment.graphql";
import { MqttAuthUsersBarEnableAuthMutation } from "./__generated__/MqttAuthUsersBarEnableAuthMutation.graphql";


export const MqttAuthUsersBarEnableFragmentTag = graphql`
  fragment MqttAuthUsersBarEnableFragment on Query
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


export const MqttAuthUsersBarEnableAuthMutationTag = graphql`
mutation MqttAuthUsersBarEnableAuthMutation(
  $input: EnableMqttUserAuthInput!
  ) {
    enableMqttUserAuth(input: $input) {
    ... on EnableMqttUserAuthPayload {
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

type MqttAuthUsersBarProps = {
  dataRef: MqttAuthUsersBarEnableFragment$key | null;
}

export default function MqttAuthUsersBar({dataRef}:MqttAuthUsersBarProps){
  const [modalState, setModalState] = useState(false);

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  
  const data = useFragment(MqttAuthUsersBarEnableFragmentTag, dataRef);

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttAuthUsersBarEnableAuthMutation>(
    MqttAuthUsersBarEnableAuthMutationTag
  );

  const toast = useToast();

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight && commit({
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
          if(response?.enableMqttUserAuth?.gQL_MqttAuthCfg){
            // ...
          }
          HandleErrors(toast, response?.enableMqttUserAuth?.errors);
        },

        optimisticUpdater(store){

          if(data?.mqttServerAuthCfg.id){
            var hook = store.get(data?.mqttServerAuthCfg.id);

            hook?.setValue(checked,"userAuthEnabled")
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
      <ModalContainer label="Define User">
        <CreateMqttAuthUser />
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
        id={"enable_user_auth"}
        uncheckedColor="bg-red-500"
        checked={data?.mqttServerAuthCfg.userAuthEnabled ?? false}
        onChange={handleCheckedEvent}
      />
    </div>
  </> 
}