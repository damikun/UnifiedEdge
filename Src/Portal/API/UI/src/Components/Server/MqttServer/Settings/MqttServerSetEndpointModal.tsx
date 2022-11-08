import clsx from "clsx";
import { useFormik } from "formik";
import { FragmentRefs } from "relay-runtime";
import { graphql } from "babel-plugin-relay/macro";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import React, { useCallback, useEffect, useState } from "react";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { useFragment, useLazyLoadQuery, useMutation } from "react-relay";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { MqttServerSetEndpointModalQuery } from "./__generated__/MqttServerSetEndpointModalQuery.graphql";
import { AdapterSelect, AdapterSelectDetailDataFragmentTag } from "../../../../Shared/AdapterSelect/AdapterSelect";
import { MqttServerSetEndpointModalMutation, SetMqttServerEndpointInput } from "./__generated__/MqttServerSetEndpointModalMutation.graphql";
import { AdapterSelectDetailDataFragment$key } from "../../../../Shared/AdapterSelect/__generated__/AdapterSelectDetailDataFragment.graphql";



export const MqttServerSetEndpointModalQueryTag = graphql`
  query MqttServerSetEndpointModalQuery
  {
    defaultAdapter {
      id
      adapter{
        ...AdapterSelectDetailDataFragment
      }
    }

    ...AdapterSelectPaginationDataFragment
  }
`;

const MqttServerSetEndpointModalMutationTag = graphql`
  mutation MqttServerSetEndpointModalMutation($input: SetMqttServerEndpointInput!) {
    setMqttServerEndpoint(input: $input) {
      ... on SetMqttServerEndpointPayload{
        gQL_MqttServerEndpoint {
          id
          iPAddress
          port
          serverUid
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

export default React.memo(MqttServerSetEndpointModal)

type MqttServerSetEndpointModalProps = {
  server_uid:string
}

function MqttServerSetEndpointModal({server_uid}:MqttServerSetEndpointModalProps) {

  const data = useLazyLoadQuery<MqttServerSetEndpointModalQuery>(
    MqttServerSetEndpointModalQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
    },
  );

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttServerSetEndpointModalMutation>(MqttServerSetEndpointModalMutationTag);

  const [selected, setSelected] = useState<AdapterSelectDetailDataFragment$key | null>(data.defaultAdapter.adapter);

  const selected_data = useFragment(AdapterSelectDetailDataFragmentTag, selected);
  
  const toast = useToast();

  const modalCtx = useModalContext();

  const formik = useFormik<SetMqttServerEndpointInput>({
    initialValues: {
      port: 1,
      ip: "unknown",
      server_uid: server_uid
    },

    onSubmit: async (values) => { 
      commit({
        variables: {
          input: {
           server_uid : server_uid,
           ip: values.ip,
           port: values.port
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.setMqttServerEndpoint?.gQL_MqttServerEndpoint){
            modalCtx.close()
          }
          HandleErrors(toast, response?.setMqttServerEndpoint?.errors);
        },
      });
    },

    validate: (values) => {
      return generateErrors(values, {
        port: [
          is.required(),
          is.greaterThan(0),
          is.notEqual(0),
          is.lessThan(100000)
        ],
        ip: [
          is.required()
        ],
        server_uid: [
          is.required()
        ],

      });
    },

    validateOnChange: true

  });

  useEffect(() => {
    formik.setFieldValue("ip",selected_data?.addresses.unicastAddresses.at(0))
  }, [selected_data])

  const handleSelect = useCallback(
    (adapter: {
      readonly id: string;
      readonly name: string;
      readonly " $fragmentSpreads": FragmentRefs<"AdapterSelectDetailDataFragment" | "AdapterListItemDataFragment">;
  } | null) => {
      setSelected(adapter)
    },
    [setSelected],
  )

  return (
    <ModalContainer label="Set endpoint">
      <div className={clsx("flex flex-col space-y-5 w-full px-4 py-6",
        isInFlight && "cursor-progress"
        )}>
          <form
            onSubmit={formik.handleSubmit}
            className="px-3 pb-2 w-full space-y-2">

            <FormInput
              label="Port"
              id="port"
              focusOnMount
              type="number"
              min={1}
              disabled={isInFlight}
              error={formik.errors.port}
              value={formik.values.port}
              onChange={formik.handleChange}
            />
            
            <div className="flex flex-col space-y-2">
              <div className="font-semibold">IP Address</div>
              <AdapterSelect
                error={formik.errors.ip !== undefined}
                disable={isInFlight}
                onSelect={handleSelect}
                selected_id={selected_data?.id}
                dataRef={data}
              />
            </div>

            <div className="flex pt-10 w-full items-center justify-center">
              <StayledButton 
                type="submit"
                isloading={isInFlight}
                className="w-full max-w-sm"
                size="medium"
                variant="secondaryblue">
                  Save
              </StayledButton>
            </div>

        </form>

      </div>
    </ModalContainer>
  )
}
