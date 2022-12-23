import clsx from "clsx";
import { useMutation } from "react-relay";
import { useParams } from "react-router-dom";
import { useCallback, useState, } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import { MqttExplorerPublishMessageMutation } from "./__generated__/MqttExplorerPublishMessageMutation.graphql";


const MqttExplorerPublishMessageMutationTag = graphql`
  mutation MqttExplorerPublishMessageMutation(
    $input: PublishMqttMessageInput!
    ) {
      publishMqttMessage(input: $input) {
      ... on PublishMqttMessagePayload {
        gQL_MqttMessage{
          id
          clientId
          topic
          qos
          retain
          payload
          payloadUtf8Str
          isJsonPayload
          isTextPayload
          contentType
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

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  
  const [
    commit_publish,
    isInFlight_publish,
  ] = useMutation<MqttExplorerPublishMessageMutation>(
    MqttExplorerPublishMessageMutationTag
  );

  const modalCtx = useModalContext();
  
  const toast = useToast();

  const handlePublish = useCallback(
    () => {

      return !isInFlight_publish  && commit_publish({
        variables: {
          input: {
            server_uid:server_id,
            contentType:"UNDEFINED",
            qos:"AT_LEAST_ONCE",
            payload:[],
            retain:false,
            topic:"/topic",
            expireInterval:0
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.publishMqttMessage?.gQL_MqttMessage){
            // ...
          }
          HandleErrors(toast, response?.publishMqttMessage?.errors);
        },

      });
    },
    [
      isInFlight_publish,
      commit_publish,
      toast
    ]
  );

  
  return <ModalContainer label="Publish Message">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      Form place...
    </div>
  </ModalContainer>
}