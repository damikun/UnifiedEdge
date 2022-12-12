import { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../Utils/ErrorHelper";
import CardContent from "../../UIComponents/Card/CardContent";
import { FormSwitch } from "../../UIComponents/Form/FormSwitch";
import { useToast } from "../../UIComponents/Toast/ToastProvider";
import { ApiInfoRestFragment$key } from "./__generated__/ApiInfoRestFragment.graphql";
import { ApiInfoRestEnableMutation } from "./__generated__/ApiInfoRestEnableMutation.graphql";
import clsx from "clsx";

import restLogo from "./../../Images/rest.webp"


const ApiInfoRestFragmentTag = graphql`
    fragment ApiInfoRestFragment on GQL_Edge
    {
      id
      apiRest
    }
`;


export const ApiInfoRestEnableMutationTag = graphql`
mutation ApiInfoRestEnableMutation(
  $input: EnableRestApiInput!
  ) {
    enableRestApi(input: $input) {
    ... on EnableRestApiPayload {
      gQL_Edge{
        id
        apiRest
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
    dataRef:ApiInfoRestFragment$key | null;
};

export default function ServerInfoName({dataRef}:ServerInfoNameProps){

  const data = useFragment(ApiInfoRestFragmentTag, dataRef);
   
  const [
    commit,
    isInFlight,
  ] = useMutation<ApiInfoRestEnableMutation>(
    ApiInfoRestEnableMutationTag
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
          if(response?.enableRestApi?.gQL_Edge){
            // ...
          }
          HandleErrors(toast, response?.enableRestApi?.errors);
        },

        optimisticUpdater(store){

          if(data?.id){
            var hook = store.get(data?.id);

            hook?.setValue(checked,"apiRest")
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
        <img src={restLogo} alt="REST API"/>
      </div>}
      title="Rest">

      <div className="ml-auto flex justify-end">
        <FormSwitch
        id={"enable_restApi"}
        uncheckedColor="bg-red-500"
        checked={data?.apiRest ?? false}
        onChange={handleCheckedEvent}
        />
      </div>
    </CardContent>
}