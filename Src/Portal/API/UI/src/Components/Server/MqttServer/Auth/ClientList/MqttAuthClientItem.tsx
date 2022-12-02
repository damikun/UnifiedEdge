import clsx from "clsx";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import TableItem from "../../../../../UIComponents/Table/TableItem";
import { FormSwitch } from "../../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import { MqttAuthClientItemDataFragment$key } from "./__generated__/MqttAuthClientItemDataFragment.graphql";
import { MqttAuthClientItemEnableMutation } from "./__generated__/MqttAuthClientItemEnableMutation.graphql";


const MqttAuthClientItemDataFragment = graphql`
  fragment MqttAuthClientItemDataFragment on GQL_MqttAuthClient {
      clientId
      enabled
      id
  }
`;

const MqttAuthClientItemEnableMutationTag = graphql`
  mutation MqttAuthClientItemEnableMutation(
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



type MqttAuthClientItemProps = {
  dataRef: MqttAuthClientItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
  key_?:string
}

export function MqttAuthClientItem({dataRef, onItemClick,key_}:MqttAuthClientItemProps){

  const data = useFragment(MqttAuthClientItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      data?.id && startTransition(() => {
        onItemClick(data.id)
      });
    },
    [onItemClick,data],
  )

  
  const [
    commit,
    isInFlight,
  ] = useMutation<MqttAuthClientItemEnableMutation>(
    MqttAuthClientItemEnableMutationTag
  );

  const toast = useToast();

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            authClient_id: data?.id as string,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttAuthClinet?.gQL_MqttAuthClient){
            // ...
          }
          HandleErrors(toast, response?.enableMqttAuthClinet?.errors);
        },

        optimisticUpdater(store){

          if(data?.id){
            var hook = store.get(data?.id);

            hook?.setValue(checked,"enabled")
          }
        }

      });
    },
    [isInFlight,data?.id,commit,toast]
  );


  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.clientId}
      </div>
    </td>
    <td className={clsx("w-5/12 2xl:w-2/12 flex",
      "justify-center items-center")}>
        <FormSwitch
          id={"active"}
          checked={data?.enabled ?? false}
          label={"Enable"}
          onChange={handleCheckedEvent}
        />
    </td>
  </TableItem>
}
