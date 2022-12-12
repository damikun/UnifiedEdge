import { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../Utils/ErrorHelper";
import CardContent from "../../UIComponents/Card/CardContent";
import { FormSwitch } from "../../UIComponents/Form/FormSwitch";
import { useToast } from "../../UIComponents/Toast/ToastProvider";
import { ApiInfoGraphqlFragment$key } from "./__generated__/ApiInfoGraphqlFragment.graphql";
import { ApiInfoGraphqlEnableMutation } from "./__generated__/ApiInfoGraphqlEnableMutation.graphql";
import clsx from "clsx";
import graphqlLogo from "./../../Images/graphql.webp"

const ApiInfoGraphqlFragmentTag = graphql`
    fragment ApiInfoGraphqlFragment on GQL_Edge
    {
        id
        apiGraphql
    }
`;


export const ApiInfoGraphqlEnableMutationTag = graphql`
mutation ApiInfoGraphqlEnableMutation(
  $input: EnableGraphqlApiInput!
  ) {
    enableGraphqlApi(input: $input) {
    ... on EnableGraphqlApiPayload {
      gQL_Edge{
        id
        apiGraphql
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

type ServerInfoNameProps = {
    dataRef:ApiInfoGraphqlFragment$key | null;
};

export default function ServerInfoName({dataRef}:ServerInfoNameProps){

  const data = useFragment(ApiInfoGraphqlFragmentTag, dataRef);
    
  const [
    commit,
    isInFlight,
  ] = useMutation<ApiInfoGraphqlEnableMutation>(
    ApiInfoGraphqlEnableMutationTag
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
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableGraphqlApi?.gQL_Edge){
            // ...
          }
          HandleErrors(toast, response?.enableGraphqlApi?.errors);
        },

        optimisticUpdater(store){

          if(data?.id){
            var hook = store.get(data?.id);

            hook?.setValue(checked,"apiGraphql")
          }
        }

      });
    },
    [
      isInFlight,
      commit,
      toast,
      data?.id
    ]
  );
  
    return <CardContent
    cusomIcon={ <div className={
    clsx("p-2 h-14 w-14 lg:w-16 lg:h-16 rounded-full",
    "bg-gray-50 m-2 justify-cente flex")}>
        <img src={graphqlLogo} alt="GRAPHQL API"/>
    </div>}
    title="Graphql">
    <div className="ml-auto flex justify-end">
        <FormSwitch
        id={"enable_graphqlApi"}
        uncheckedColor="bg-red-500"
        checked={data?.apiGraphql ?? false}
        onChange={handleCheckedEvent}
        />
    </div>
    </CardContent>
}