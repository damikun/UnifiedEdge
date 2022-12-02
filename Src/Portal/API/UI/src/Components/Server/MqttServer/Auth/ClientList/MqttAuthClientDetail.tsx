import clsx from "clsx";
import { useCallback, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { CLIENT_PARAM_NAME } from "./MqttAuthClients";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useParams, useSearchParams } from "react-router-dom";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import { FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttAuthClientDetailQuery } from "./__generated__/MqttAuthClientDetailQuery.graphql";
import { MqttAuthClientDetailEnableMutation } from "./__generated__/MqttAuthClientDetailEnableMutation.graphql";


const MqttAuthClientDetailTag = graphql`
  query MqttAuthClientDetailQuery($authClient_id:ID!) {
    mqttAuthClientById(authClient_id: $authClient_id) {
      clientId
      enabled
      id
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


export default function MqttAuthClientDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
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
    commit,
    isInFlight,
  ] = useMutation<MqttAuthClientDetailEnableMutation>(
    MqttAuthClientDetailEnableMutationTag
  );

  const toast = useToast();
  
  const handleEnable = useCallback(
    () => {
      server_id && client_id  &&! isInFlight && commit({
        variables: {
          input: {
            authClient_id: client_id,
            enable:false
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttAuthClinet?.gQL_MqttAuthClient){
              //success
          }

          HandleErrors(toast, response?.enableMqttAuthClinet?.errors);
        },

      });
    },
    [isInFlight,server_id,client_id,toast,commit],
  )


  return <ModalContainer label="Client detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
        <FieldGroup>
            <FieldSection multiline name="Client Id">
                <div className={clsx("font-sans text-gray-700 font-semibold",
                "text-sm max-w-full break-all select-all")}>
                    {data?.mqttAuthClientById.clientId}
                </div>
            </FieldSection>
        </FieldGroup>
    </div>
  </ModalContainer>
}