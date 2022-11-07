import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../../UIComponents/Badged/Badge";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../../UIComponents/Card/CardContent";
import { WebHookActivDataFragment$key } from "./__generated__/WebHookActivDataFragment.graphql";


const WebHookActivDataFragment = graphql`
    fragment WebHookActivDataFragment on GQL_WebHook
    {   
        isActive
    }
`;

type WebHookActivProps = {
    dataRef:WebHookActivDataFragment$key;
};

export default function WebHookActiv({dataRef}:WebHookActivProps){

    const data = useFragment(WebHookActivDataFragment, dataRef);

    return <CardContent icon={faPlug} title="State" value={
        <Badge 
            size="thin"
            variant={data.isActive?"secondarygreen":"secondarygray"}>
            {data.isActive?"Enabled":"Disabled"}
        </Badge>
    }/>
}