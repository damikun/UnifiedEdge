import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetUptimeString } from "../../../Shared/Common";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../UIComponents/Card/CardContent";
import { ServerInfoUptimeDataFragment$key } from "./__generated__/ServerInfoUptimeDataFragment.graphql";

const ServerInfoUptimeDataFragment = graphql`
    fragment ServerInfoUptimeDataFragment on GQL_IServer
    {   
        uptime {
            days
            hours
            isValid
            minutes
            uptime
        }
    }
`;

type ServerInfoUptimeProps = {
    dataRef:ServerInfoUptimeDataFragment$key;
};

export default function ServerInfoUptime({dataRef}:ServerInfoUptimeProps){

    const data = useFragment(ServerInfoUptimeDataFragment, dataRef);

    const server_uptime = useMemo(()=>{
        if(data.uptime?.isValid){
            return GetUptimeString(
                data?.uptime?.days as number,
                data?.uptime?.hours as number,
                data?.uptime?.minutes as number);
        }else{
            return "N/A";
        }

    },[data])
    
    return <CardContent icon={faStopwatch} title="Uptime" value={server_uptime}/>
}