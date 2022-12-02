import clsx from "clsx";
import { useCallback, useState } from "react";
import { USER_PARAM_NAME } from "./MqttAuthUsers";
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useParams, useSearchParams } from "react-router-dom";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttAuthUserDetailQuery } from "./__generated__/MqttAuthUserDetailQuery.graphql";
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


export default function MqttAuthUserDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  const [client_id] = useState(searchParams.get(USER_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttAuthUserDetailQuery>(
    MqttAuthUserDetailTag,
    {
      authUser_id:client_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttAuthUserDetailFetchKey"
    },
  );

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttAuthUserDetailEnableMutation>(
    MqttAuthUserDetailEnableMutationTag
  );

  const toast = useToast();
  
  const handleEnable = useCallback(
    () => {
      server_id && client_id  &&! isInFlight && commit({
        variables: {
          input: {
            authUser_id: client_id,
            enable:false
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttAuthUser?.gQL_MqttAuthUser){
              //success
          }

          HandleErrors(toast, response?.enableMqttAuthUser?.errors);
        },

      });
    },
    [isInFlight,server_id,client_id,toast,commit],
  )


  return <ModalContainer label="User detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
        <FieldGroup>
            <FieldSection multiline name="User Id">
                <div className={clsx("font-sans text-gray-700 font-semibold",
                "text-sm max-w-full break-all select-all")}>
                    {data?.mqttAuthUserById.userName}
                </div>
            </FieldSection>
        </FieldGroup>
    </div>
  </ModalContainer>
}