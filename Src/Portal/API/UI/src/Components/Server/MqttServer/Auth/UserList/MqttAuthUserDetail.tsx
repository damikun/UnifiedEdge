import clsx from "clsx";
import { useFormik } from "formik";
import { useCallback, useMemo } from "react";
import { USER_PARAM_NAME } from "./MqttAuthUsers";
import { graphql } from "babel-plugin-relay/macro";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { GetLocalDate } from "../../../../../Shared/Common";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useMqttAuthUsersCtx } from "./MqttAuthCUsersCtxProvider";
import { generateErrors, is } from "../../../../../Utils/Validation";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useModalContext } from "../../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttAuthUserDetailQuery } from "./__generated__/MqttAuthUserDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttAuthUserDetailRemoveMutation } from "./__generated__/MqttAuthUserDetailRemoveMutation.graphql";
import { MqttAuthUserDetailEnableMutation } from "./__generated__/MqttAuthUserDetailEnableMutation.graphql";
import { MqttAuthUserDetailUpdatePasswordMutation, SetMqttAuthUserPasswordInput } from "./__generated__/MqttAuthUserDetailUpdatePasswordMutation.graphql";
import { usePresistedSearchParam } from "../../../../../Hooks/usePresistedSearchParam";


const MqttAuthUserDetailTag = graphql`
  query MqttAuthUserDetailQuery($authUser_id:ID!) {
    mqttAuthUserById(authUser_id: $authUser_id) {
      userName
      enabled
      id
      system
      lastAuthenticate
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


const MqttAuthUserDetailUpdatePasswordMutationTag = graphql`
  mutation MqttAuthUserDetailUpdatePasswordMutation(
    $input: SetMqttAuthUserPasswordInput!,
    ) {
      setMqttAuthUserPassword(input: $input) {
      ... on SetMqttAuthUserPasswordPayload {
        gQL_MqttAuthUser{
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

  const user_id = usePresistedSearchParam(USER_PARAM_NAME)

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
  
  const [
    commit_passwordUpdate,
    isInFlight_passwordUpdate,
  ] = useMutation<MqttAuthUserDetailUpdatePasswordMutation>(
    MqttAuthUserDetailUpdatePasswordMutationTag
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

  const formik = useFormik<SetMqttAuthUserPasswordInput>({
    initialValues: {
      authUserId:data.mqttAuthUserById.id,
      password: "",
    },

    onSubmit: async (values) => {
        !isInFlight_passwordUpdate &&
        values.password !== "" &&
        commit_passwordUpdate({
          variables: {
            input: {
              authUserId: values.authUserId,
              password: values.password,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setMqttAuthUserPassword?.gQL_MqttAuthUser){
              toast?.pushSuccess("Password updated")
              formik?.setFieldValue("password","");
            }
            HandleErrors(toast, response?.setMqttAuthUserPassword?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        password: [
          is.required(),
          is.minLength(3),
        ]
      });
    },

    validateOnChange: false

  });

  const hasChanged = useMemo(() => formik.values.password !== "" ,
  [formik.values.password]
 )
 
 const dt = useMemo(()=>{
  return GetLocalDate(data?.mqttAuthUserById.lastAuthenticate);
},[data]) 

  return <ModalContainer label="User detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      <FieldGroup>
        <FieldSection name="UserName">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {data?.mqttAuthUserById.userName}
          </div>
        </FieldSection>
        <FieldSection name="Enable">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all")}>
            <FormSwitch
              id={"active"}
              checked={data?.mqttAuthUserById.enabled}
              onChange={handleCheckedEvent}
            />
          </div>
        </FieldSection>
        <FieldSection name="Password">
          <form
            onSubmit={formik.handleSubmit}
            className="pb-0 w-full flex flex-row space-x-2 max-w-sm">
              <FormInput
              id="password"
              flexOrientation="flex-row"
              disabled={isInFlight_passwordUpdate}
              error={formik.errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}
              afterFieldComponent={
                hasChanged && <StayledButton isloading={isInFlight_passwordUpdate} className="mt-auto" type="submit">Save</StayledButton>
              }
            />
          </form>
        </FieldSection>
        <FieldSection name="Last trigger">
          <div className={clsx("font-sans text-gray-700 font-semibold",
          "text-sm max-w-full break-all select-all capitalize")}>
            {dt}
          </div>
        </FieldSection>
      </FieldGroup>
      <FieldDivider/>
      
      {
        !data?.mqttAuthUserById?.system ? <>
          <FieldSection multiline name="Delete">
            <div className="max-w-lg">
              <StayledButton
                variant="error"
                iconLeft={faTrash}
                size="normal"
                onClick={handleRemove}>
                  Remove
              </StayledButton>
            </div>
          </FieldSection>
        </> :
        <>
        <FieldSection multiline name="Delete">
          System user is not removable!
        </FieldSection>
        </>
      }

    </div>
  </ModalContainer>
}