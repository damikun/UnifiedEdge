import clsx from "clsx";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useTransition } from "react";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { useMqttExplorerSubCtx } from "./MqttExplorerSubCtx";
import TableItem from "../../../../UIComponents/Table/TableItem";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { MqttExplorerSubItemDataFragment$key } from "./__generated__/MqttExplorerSubItemDataFragment.graphql";
import { MqttExplorerSubItemRemoveMutation } from "./__generated__/MqttExplorerSubItemRemoveMutation.graphql";


const MqttExplorerSubItemDataFragment = graphql`
  fragment MqttExplorerSubItemDataFragment on GQL_MqttExplorerSub {
    id
    topic
  }
`;


export const MqttExplorerSubItemRemoveMutationTag = graphql`
  mutation MqttExplorerSubItemRemoveMutation(
    $input: RemoveMqttServerExplorerUserSubInput!
    $connections: [ID!]!
    ) {
      removeMqttServerExplorerUserSub(input: $input) {
      ... on RemoveMqttServerExplorerUserSubPayload {
        gQL_MqttExplorerSub{
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


type MqttExplorerSubItemProps = {
  dataRef: MqttExplorerSubItemDataFragment$key | null;
  onItemClick: (id:string|undefined)=>void
}

export function MqttExplorerSubItem({dataRef, onItemClick}:MqttExplorerSubItemProps){

  const data = useFragment(MqttExplorerSubItemDataFragment, dataRef);
  
  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const ctx = useMqttExplorerSubCtx();

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
  ] = useMutation<MqttExplorerSubItemRemoveMutation>(
    MqttExplorerSubItemRemoveMutationTag
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
            storedsub_id:data?.id ?? ""
          },
          connections: ctx.connection_id?[ctx.connection_id]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeMqttServerExplorerUserSub?.gQL_MqttExplorerSub){
            // ...
          }
          HandleErrors(toast, response?.removeMqttServerExplorerUserSub?.errors);
        },

        optimisticUpdater(store){

          if(data?.id){
            var hook = store.get(data?.id);

            hook?.setValue(checked,"enabled")
          }
        }

      });
    },
    [isInFlight,data?.id,commit,toast,ctx.connection_id]
  );


  return <TableItem
    onClick={handleClick}
    key={data?.id}>
    <td className="w-6/12 2xl:w-8/12 flex truncate capitalize">
      <div className="truncate font-sans text-gray-700 font-semibold text-sm">
        {data?.topic}
      </div>
    </td>
  </TableItem>
}
