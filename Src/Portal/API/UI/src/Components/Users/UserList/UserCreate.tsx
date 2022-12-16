import React  from "react";
import { useFormik } from "formik";
import {useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useUserListCtx } from "./UserListCtxProvider";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { CreateUserInput, UserCreateMutation } from "./__generated__/UserCreateMutation.graphql";



const UserCreateMutationTag = graphql`
  mutation UserCreateMutation(
      $input: CreateUserInput!
      $connections: [ID!]!
    ){
    createUser(input: $input) {
      ... on CreateUserPayload {
        gQL_User    
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_User"
          ){
            ...UserListItemDataFragment
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
  }`


export default React.memo(CreateNewUser)

function CreateNewUser(){

  const [
    commit,
    isInFlight,
  ] = useMutation<UserCreateMutation>(UserCreateMutationTag);

  const conCtx = useUserListCtx();

  const toast = useToast();

  const modalCtx = useModalContext();
  
  const formik = useFormik<CreateUserInput>({
    initialValues: {
      first_name: "",
      last_name: "",
      user_name: "",
      password: ""
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              first_name: values.first_name,
              last_name: values.last_name,
              user_name: values.user_name,
              password: values.password,
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.createUser?.gQL_User){
              modalCtx?.close();
            }
            HandleErrors(toast, response?.createUser?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        first_name: [
          is.required(),
          is.minLength(3),
        ],
        last_name: [
          is.required(),
          is.minLength(3),
        ],
        user_name: [
          is.required(),
          is.minLength(3),
        ],
        password: [
          is.required(),
          is.minLength(3),
        ],
      });
    },

    validateOnChange: false

  });
  
  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full space-y-2">
      
    <FormInput
      label="User Name"
      id="user_name"
      focusOnMount
      disabled={isInFlight}
      error={formik.errors.user_name}
      value={formik.values.user_name}
      onChange={formik.handleChange}
    />

    <FormInput
      label="First Name"
      id="first_name"
      disabled={isInFlight}
      error={formik.errors.first_name}
      value={formik.values.first_name}
      onChange={formik.handleChange}
    />

    <FormInput
      label="Last Name"
      id="last_name"
      disabled={isInFlight}
      error={formik.errors.last_name}
      value={formik.values.last_name}
      onChange={formik.handleChange}
    />

    <FormInput
      label="Password"
      id="password"
      type={"password"}
      disabled={isInFlight}
      error={formik.errors.password}
      value={formik.values.password??""}
      onChange={formik.handleChange}
    />

    <div className="pt-5">
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
    </div>
  </form>
}

