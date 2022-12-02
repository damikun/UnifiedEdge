import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../../../Utils/Validation";
import { useMqttAuthClientsCtx } from "./MqttAuthClientsCtxProvider";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { CreateMqttAuthClientInput, CreateMqttAuthClientMutation } from "./__generated__/CreateMqttAuthClientMutation.graphql";


const CreateMqttAuthClientMutationTag = graphql`
  mutation CreateMqttAuthClientMutation(
    $input: CreateMqttAuthClientInput!
    $connections: [ID!]!
    ) {
      createMqttAuthClient(input: $input) {
      ... on CreateMqttAuthClientPayload {
        gQL_MqttAuthClient    
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttAuthClient"
          ){
            ...MqttAuthClientItemDataFragment
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

export default function CreateMqttAuthClient(){

  const [
    commit,
    isInFlight,
  ] = useMutation<CreateMqttAuthClientMutation>(CreateMqttAuthClientMutationTag);

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const conCtx = useMqttAuthClientsCtx();

  const toast = useToast();

  const modalCtx = useModalContext();

  const formik = useFormik<CreateMqttAuthClientInput>({
    initialValues: {
      clientId: "",
      server_uid:server_id
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              clientId: values.clientId,
              server_uid: values.server_uid
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.createMqttAuthClient?.gQL_MqttAuthClient){
              modalCtx?.close();
            }

            HandleErrors(toast, response?.createMqttAuthClient?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        clientId: [
          is.required(),
          is.minLength(3),
        ],
      });
    },

    validateOnChange: true

  });

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full">
    
      <FormInput
        label="ClientId"
        id="clientId"
        error={formik.errors.clientId}
        value={formik.values.clientId}
        focusOnMount
        disabled={isInFlight}
        onChange={formik.handleChange}
      />
      <div className="mb-6 text-center mt-10 h-10 flex-1">
        <StayledButton
          isloading={isInFlight}
          variant="secondaryblue"
          disabled={isInFlight}
          className="flex-1 my-auto w-full"
          type="submit"
        >
          <div className="mx-auto my-auto">Confirm</div>
        </StayledButton>
      </div>

  </form>
}