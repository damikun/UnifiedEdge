import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../../UIComponents/Card/CardContent";
import { WebHookLastRunDataFragment$key } from "./__generated__/WebHookLastRunDataFragment.graphql";


const WebHookLastRunDataFragment = graphql`
    fragment WebHookLastRunDataFragment on GQL_WebHook
    {   
        lastTrigger
    }
`;

type WebHookLastRunProps = {
    dataRef:WebHookLastRunDataFragment$key;
};

export default function WebHookLastRun({dataRef}:WebHookLastRunProps){

    const data = useFragment(WebHookLastRunDataFragment, dataRef);

    const dt = useMemo(()=>{
       return data?.lastTrigger ? 
       new Date(data.lastTrigger).toLocaleString():
       "N/A"
    },[data])
    
    return <CardContent icon={faStopwatch} title="Last run" value={dt}/>
}