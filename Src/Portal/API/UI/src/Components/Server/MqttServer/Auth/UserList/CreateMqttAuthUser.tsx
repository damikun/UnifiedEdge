import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useMqttAuthUsersCtx } from "./MqttAuthCUsersCtxProvider";
import { generateErrors, is } from "../../../../../Utils/Validation";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { CreateMqttAuthUserInput, CreateMqttAuthUserMutation } from "./__generated__/CreateMqttAuthUserMutation.graphql";


const CreateMqttAuthUserMutationTag = graphql`
  mutation CreateMqttAuthUserMutation(
    $input: CreateMqttAuthUserInput!
    $connections: [ID!]!
    ) {
      createMqttAuthUser(input: $input) {
      ... on CreateMqttAuthUserPayload {
        gQL_MqttAuthUser    
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttAuthUser"
          ){
            ...MqttAuthUserItemDataFragment
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

export default function CreateMqttAuthUser(){

  const [
    commit,
    isInFlight,
  ] = useMutation<CreateMqttAuthUserMutation>(CreateMqttAuthUserMutationTag);

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const conCtx = useMqttAuthUsersCtx();

  const toast = useToast();

  const modalCtx = useModalContext();

  const formik = useFormik<CreateMqttAuthUserInput>({
    initialValues: {
      userName: "",
      password: "",
      server_uid:server_id
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              userName: values.userName,
              password: values.password,
              server_uid:values.server_uid
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.createMqttAuthUser?.gQL_MqttAuthUser){
              modalCtx?.close();
            }

            HandleErrors(toast, response?.createMqttAuthUser?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        userName: [
          is.required(),
          is.minLength(3),
        ],
        password: [
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
        label="UserName"
        id="userName"
        error={formik.errors.userName}
        value={formik.values.userName}
        focusOnMount
        disabled={isInFlight}
        onChange={formik.handleChange}
      />
      <FormInput
        label="Password"
        id="password"
        error={formik.errors.password}
        value={formik.values.password}
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
          <div className="mx-auto my-auto">
            Confirm
          </div>
        </StayledButton>
      </div>

  </form>
}