import clsx from "clsx";
import { useMemo } from "react";
import Card from "../../UIComponents/Card/Card";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import CardContent from "../../UIComponents/Card/CardContent";
import { GetServerDateTimeStr, GetUptimeString } from "../../Shared/Common";
import { EdgeInfoDataFragment$key } from "./__generated__/EdgeInfoDataFragment.graphql";
import { faClock, faServer, faSignsPost, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { EdgeInfoUptimeSubscription } from "./__generated__/EdgeInfoUptimeSubscription.graphql";
import { EdgeInfoDateTimeSubscription } from "./__generated__/EdgeInfoDateTimeSubscription.graphql";

const EdgeInfoDataFragment = graphql`
    fragment EdgeInfoDataFragment on Query {
        
        systemInfo {
            serverDateTime
            targetFramework
            osVersion {
                platform
                version
            }
            uptime {
                days
                hours
                minutes
            }
        }
        
        edgeInfo {
            id
            name
            guid
        }
    }
`;

const UptimeSub = graphql`
    subscription EdgeInfoUptimeSubscription{
        uptime {
            hours
            minutes
            days
        }
    }
`;

const DateTimeSub = graphql`
    subscription EdgeInfoDateTimeSubscription{
        systemTime
    }
`;


type EdgeInfoProps = {
    dataRef:EdgeInfoDataFragment$key;
};

export default function EdgeInfo({dataRef}:EdgeInfoProps){

    const data = useFragment(EdgeInfoDataFragment, dataRef);

    const uptime_sub_config = useMemo(() => ({
        variables: {},
        subscription:UptimeSub,
        updater: store => { },
        onCompleted: () => {} /* Subscription established */,
        onError: error => {} /* Subscription errored */,
        onNext: response => {} /* Subscription payload received */,
      }as GraphQLSubscriptionConfig<EdgeInfoUptimeSubscription>), []);
    
    useSubscription<EdgeInfoUptimeSubscription>(uptime_sub_config);

    const datetime_sub_config = useMemo(() => ({
        variables: {},
        subscription:DateTimeSub,
        updater: store => { },
        onCompleted: () => {} /* Subscription established */,
        onError: error => {} /* Subscription errored */,
        onNext: response => {} /* Subscription payload received */,
      }as GraphQLSubscriptionConfig<EdgeInfoDateTimeSubscription>), []);
    
    useSubscription<EdgeInfoDateTimeSubscription>(datetime_sub_config);
      
    const server_dt = useMemo(()=>{
        return GetServerDateTimeStr(data?.systemInfo?.serverDateTime);
    },[data]) 

    const server_uptime = useMemo(()=>{
        return GetUptimeString(
            data?.systemInfo?.uptime?.days as number,
            data?.systemInfo?.uptime?.hours  as number,
            data?.systemInfo?.uptime?.minutes  as number);
    },[data])

    const server_platform = useMemo(()=>{
        return `${data?.systemInfo?.targetFramework?.toLowerCase()}, ${data?.systemInfo?.osVersion?.platform?.toLowerCase()}`
    },[data])

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
        <Card className="bg-gray-50">
            <CardContent icon={faSignsPost} title="Name" value={data?.edgeInfo?.name}/>
        </Card>

        <Card className="bg-gray-50">
            <CardContent icon={faServer} title="Enviroment" value={server_platform}/>
        </Card>

        <Card className="bg-gray-50">
            <CardContent icon={faStopwatch} title="Uptime" value={server_uptime}/>
        </Card>

        <Card className="bg-gray-50">
            <CardContent icon={faClock} title="System Time" value={server_dt}/>
        </Card>
    </div>
}
