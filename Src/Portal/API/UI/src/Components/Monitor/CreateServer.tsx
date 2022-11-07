import { useFormik } from "formik";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { HandleErrors } from "../../Utils/ErrorHelper";
import { is, generateErrors } from "../../Utils/Validation";
import { FormInput } from "../../UIComponents/Form/FormInput";
import { useModalContext } from "../../UIComponents/Modal/Modal";
import { useToast } from "../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../UIComponents/Buttons/StayledButton";
import { useMonitorServerListCtx } from "./ServerList/ServerListCtxProvider";
import FormSelect, { FormSelectOption } from "../../UIComponents/Form/FormSelect";
import { CreateServerInput, CreateServerMutation } from "./__generated__/CreateServerMutation.graphql";


const CreateServerMutationTag = graphql`
  mutation CreateServerMutation(
    $request: CreateServerInput!
    $connections: [ID!]!
    ) {
      createServer(request: $request) {
      ... on CreateServerPayload {
        # errors {
        #   ... on IBaseError {
        #     message
        #   }
        # }
          
        gQL_IServer    
          @prependNode(
            connections: $connections
            edgeTypeName: "GQL_IServer"
          ){
            ...ServerListItemDataFragment
        }
      }
    }
}
`
export default function AddNewServer(){

  const [
    commit,
    isInFlight,
  ] = useMutation<CreateServerMutation>(CreateServerMutationTag);

  const conCtx = useMonitorServerListCtx();

  const toast = useToast();

  const modalCtx = useModalContext();

  const formik = useFormik<CreateServerInput>({
    initialValues: {
      name: "",
      description: "",
      type: "MQTT"
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            request: {
              name: values.name,
              description: values.description,
              type: values.type
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.createServer.gQL_IServer){
              modalCtx?.close();
            }
            // HandleErrors(toast, response.createServer?);
            // if (response.createServer?.errors?.length === 0) {
            //   startTransition(() => {
            //     navigate(`/Hooks`);
            //   });
            // }
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        name: [
          is.required(),
          is.minLength(2),
        ],
        description: [
          is.required(),
          is.minLength(2),
        ],
        type: [
          is.required()
        ],
      });
    },

    validateOnChange: true

  });


  // const options :ListBoxData<string> = [{id: "", data: "", displayName: ""}]

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full">
      
      <FormSelect
        label="Type"
        id="type"
        error={formik.errors.type}
        value={formik.values.type}
        onChange={formik.handleChange}
      >
        <FormSelectOption value="US">MQTT</FormSelectOption>
        <FormSelectOption value="EF">OPC</FormSelectOption>
      </FormSelect>

      <FormInput
        label="Name"
        id="name"
        focusOnMount
        disabled={isInFlight}
        error={formik.errors.name}
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <FormInput
        label="Description"
        id="description"
        disabled={isInFlight}
        error={formik.errors.description}
        value={formik.values.description??""}
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