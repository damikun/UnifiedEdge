import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../../UIComponents/Card/CardContent";
import { WebHookNameDataFragment$key } from "./__generated__/WebHookNameDataFragment.graphql";


const WebHookNameDataFragment = graphql`
    fragment WebHookNameDataFragment on GQL_WebHook
    {   
        name
    }
`;

type WebHookNameProps = {
    dataRef:WebHookNameDataFragment$key;
};

export default function WebHookName({dataRef}:WebHookNameProps){

    const data = useFragment(WebHookNameDataFragment, dataRef);

    return <CardContent icon={faSignsPost} title="Name" value={data.name}/>
}