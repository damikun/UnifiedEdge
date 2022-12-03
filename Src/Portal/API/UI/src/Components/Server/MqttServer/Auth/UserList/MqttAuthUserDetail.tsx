import clsx from "clsx";
import { useCallback, useState } from "react";
import { USER_PARAM_NAME } from "./MqttAuthUsers";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useMqttAuthUsersCtx } from "./MqttAuthCUsersCtxProvider";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useModalContext } from "../../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttAuthUserDetailQuery } from "./__generated__/MqttAuthUserDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttAuthUserDetailRemoveMutation } from "./__generated__/MqttAuthUserDetailRemoveMutation.graphql";
import { MqttAuthUserDetailEnableMutation } from "./__generated__/MqttAuthUserDetailEnableMutation.graphql";


const MqttAuthUserDetailTag = graphql`
  query MqttAuthUserDetailQuery($authUser_id:ID!) {
    mqttAuthUserById(authUser_id: $authUser_id) {
      userName
      enabled
      id
    }
  }
`;

const MqttAuthUserDetailEnableMutationTag = graphql`
  mutation MqttAuthUserDetailEnableMutation(
    $input: EnableMqttAuthUserInput!
    ) {
      enableMqttAuthUser(input: $input) {
      ... on EnableMqttAuthUserPayload {
        gQL_MqttAuthUser{
          userName
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

const MqttAuthUserDetailRemoveMutationTag = graphql`
  mutation MqttAuthUserDetailRemoveMutation(
    $input: RemoveMqttAuthUserInput!,
    $connections: [ID!]!
    ) {
      removeMqttAuthUser(input: $input) {
      ... on RemoveMqttAuthUserPayload {
        gQL_MqttAuthUser{
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

export default function MqttAuthUserDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [user_id] = useState(searchParams.get(USER_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttAuthUserDetailQuery>(
    MqttAuthUserDetailTag,
    {
      authUser_id:user_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttAuthUserDetailFetchKey"
    },
  );

  const [
    commit_checked,
    isInFlight_checked,
  ] = useMutation<MqttAuthUserDetailEnableMutation>(
    MqttAuthUserDetailEnableMutationTag
  );

  const [
    commit_remove,
    isInFlight_remove,
  ] = useMutation<MqttAuthUserDetailRemoveMutation>(
    MqttAuthUserDetailRemoveMutationTag
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
            authUser_id: user_id as string,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttAuthUser?.gQL_MqttAuthUser){
            //
          }
          HandleErrors(toast, response?.enableMqttAuthUser?.errors);
        },

        optimisticUpdater(store){

          if(user_id){
            var hook = store.get(user_id);

            hook?.setValue(checked,"enabled")
          }
        }

      });
    },
    [
      isInFlight_checked,
      user_id,
      commit_checked,
      toast
    ]
  );

  const ctx = useMqttAuthUsersCtx();
  
  const handleRemove = useCallback(
    () => {

      return !isInFlight_remove  && commit_remove({
        variables: {
          input: {
            authUserId: user_id as string
          },
          connections: ctx?.connection_id ? [ctx?.connection_id]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeMqttAuthUser?.gQL_MqttAuthUser){
            modalCtx.close()
          }
          HandleErrors(toast, response?.removeMqttAuthUser?.errors);
        },
      });
    },
    [isInFlight_remove,
      user_id,
      commit_remove,
      toast,
      ctx.connection_id,
      modalCtx
    ]
  );


  return <ModalContainer label="User detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
        <FieldGroup>
          <FieldSection multiline name="UserName">
            <div className={clsx("font-sans text-gray-700 font-semibold",
            "text-sm max-w-full break-all select-all capitalize")}>
              {data?.mqttAuthUserById.userName}
            </div>
          </FieldSection>
        </FieldGroup>
        <FieldSection multiline name="Enable">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all")}>
            <FormSwitch
              id={"active"}
              checked={data?.mqttAuthUserById.enabled}
              onChange={handleCheckedEvent}
            />
          </div>
        </FieldSection>

        <FieldDivider/>

        <FieldSection multiline name="Delete">
          <div className="max-w-lg">
            <StayledButton
              variant="error"
              iconLeft={faTrash}
              size="small"
              onClick={handleRemove}>
              Remove
            </StayledButton>
          </div>
        </FieldSection>

    </div>
  </ModalContainer>
}