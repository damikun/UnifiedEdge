import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { useMqttExplorerSubCtx } from "./MqttExplorerSubCtx";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import { FormColorInput } from "../../../../UIComponents/Form/FormColorInput";
import { CreateMqttServerExplorerUserSubInput, MqttExplorerAddSubMutation } from "./__generated__/MqttExplorerAddSubMutation.graphql";



const MqttExplorerAddSubMutationTag = graphql`
  mutation MqttExplorerAddSubMutation(
    $input: CreateMqttServerExplorerUserSubInput!
    $connections: [ID!]!
    ) {
    createMqttServerExplorerUserSub(input: $input) {
    ... on CreateMqttServerExplorerUserSubPayload {
      gQL_MqttExplorerSub
      @prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttExplorerSub"
      ){
        id
        color
        noLocal
        topic
        ...MqttExplorerSubItemDataFragment
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

export default function MqttExplorerAddSub(){

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)

  const [
    commit_add,
    isInFlight_add,
  ] = useMutation<MqttExplorerAddSubMutation>(
    MqttExplorerAddSubMutationTag
  );

  const modalCtx = useModalContext();

  const connectionCtx = useMqttExplorerSubCtx();
  
  const toast = useToast();

  const formik = useFormik<CreateMqttServerExplorerUserSubInput>({
    initialValues: {
      topic:"some/topic",
      color:GetRandomColor(),
      noLocal:false,
      server_uid:server_id
    },

    onSubmit: async (values) => {
        !isInFlight_add &&
        commit_add({
          variables: {
            input: {
              topic: values.topic,
              color: values.color,
              noLocal: values.noLocal,
              server_uid: values.server_uid
            },
            connections: [connectionCtx.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.createMqttServerExplorerUserSub?.gQL_MqttExplorerSub){
              modalCtx?.close();
            }

            HandleErrors(toast, response?.createMqttServerExplorerUserSub?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        topic: [
          is.required(),
          is.minLength(1),
        ],
      });
    },

    validateOnChange: true

  });
  
  return <ModalContainer label="Add Subscription">
  <form
  onSubmit={formik.handleSubmit}
  className="px-3 pb-2 w-full space-y-5 relative">
  
    <FormInput
      label="Topic"
      id="topic"
      error={formik.errors.topic}
      value={formik.values.topic}
      focusOnMount
      disabled={isInFlight_add}
      onChange={formik.handleChange}
    />
    <FormColorInput
      label="Color"
      id="color"
      error={formik.errors.color}
      value={formik.values.color??"#FFFFFF"}
      disabled={isInFlight_add}
      onChange={formik.handleChange}
    />
    <div className="w-full pt-5">
      <StayledButton
        isloading={isInFlight_add}
        variant="secondaryblue"
        disabled={isInFlight_add}
        className="flex-1 my-auto w-full"
        type="submit"
        size="medium"
      >
        Confirm
      </StayledButton>
    </div>
</form>
</ModalContainer>
}

//---------------------------------------------

function GetRandomColor(){
  var color:string = "";

  do{
    color =  Math.floor(Math.random()*16777215).toString(16);
  }while(color.length !== 6)

  return  "#" + color;
}