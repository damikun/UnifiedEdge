import clsx from "clsx";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useState } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import { AdapterSelect } from "../../../../Shared/AdapterSelect/AdapterSelect";
import { NetworkSelectAdapterModalQuery } from "./__generated__/NetworkSelectAdapterModalQuery.graphql";
import { NetworkSelectAdapterModalMutation } from "./__generated__/NetworkSelectAdapterModalMutation.graphql";


export const NetworkSelectAdapterModalQueryTag = graphql`
  query NetworkSelectAdapterModalQuery
  {
    defaultAdapter {
      adapter{
        id
        name
        interfaceType
        physicalAddress
        addresses {
          gatewayAddresses
          unicastAddresses
        }
      }
    }
    ...AdapterSelectPaginationDataFragment
  }
`;

const NetworkSelectAdapterModalMutationTag = graphql`
  mutation NetworkSelectAdapterModalMutation($input: SetEdgeDefaultNetworkAdapterInput!) {
    setEdgeDefaultNetworkAdapter(input: $input) {
      ... on SetEdgeDefaultNetworkAdapterPayload {          
        gQL_DefaultAdapter{
          adapter{
            id
            name
            interfaceType
            physicalAddress
            addresses {
              gatewayAddresses
              unicastAddresses
            }
          }
        }
      }
    }
}
`

export default React.memo(NetworkSelectAdapterModal)


function NetworkSelectAdapterModal() {

  const data = useLazyLoadQuery<NetworkSelectAdapterModalQuery>(
    NetworkSelectAdapterModalQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
    },
  );

  const [
    commit,
    isInFlight,
  ] = useMutation<NetworkSelectAdapterModalMutation>(NetworkSelectAdapterModalMutationTag);

  const [selected, setSelected] = useState(data.defaultAdapter.adapter?.id)

  const toast = useToast();

  var commitChange = useCallback(
    (selected_id:string) => {
      selected_id && commit({
        variables: {
          input: {
            adapter_id: selected_id,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response.setEdgeDefaultNetworkAdapter.gQL_DefaultAdapter){
              // Any
          }
        },

      });
    },
    [commit,toast],
  )
  
  const handleSelect = useCallback(
    (adapter: {
      id: string;
      name: string | undefined;
    } | null) => {

      if(adapter && !isInFlight){
        setSelected(adapter.id)
        commitChange(adapter.id)
      }
    },
    [setSelected,isInFlight,commitChange],
  )

  
  return (
    <ModalContainer label="Select adapter">
      <div className={clsx(
        "flex flex-col space-y-5 w-full px-4 py-6",
        isInFlight&&"cursor-progress"
        )}>
        <AdapterSelect
          disable={isInFlight}
          onSelect={handleSelect}
          selected_id={selected}
          dataRef={data}/>
      </div>
    </ModalContainer>
  )
}
