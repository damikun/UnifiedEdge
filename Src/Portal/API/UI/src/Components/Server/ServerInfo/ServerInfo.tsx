import clsx from "clsx";
import { useFragment } from "react-relay";
import ServerInfoName from "./ServerInfoName";
import ServerInfoState from "./ServerInfoState";
import ServerInfoUptime from "./ServerInfoUptime";
import { graphql } from "babel-plugin-relay/macro";
import Card from "../../../UIComponents/Card/Card";
import { ServerInfoDataFragment$key } from "./__generated__/ServerInfoDataFragment.graphql";
import ServerInfoConfig from "./ServerInfoConfig";

const ServerInfoDataFragment = graphql`
    fragment ServerInfoDataFragment on GQL_IServer {
        ...ServerInfoNameDataFragment
        ...ServerInfoStateDataFragment
        ...ServerInfoUptimeDataFragment
        ...ServerInfoConfigDataFragment
    }
`;

// const UptimeSub = graphql`
//     subscription ServerInfoUptimeSubscription{
//         uptime {
//             hours
//             minutes
//             days
//         }
//     }
// `;

// const DateTimeSub = graphql`
//     subscription ServerInfoDateTimeSubscription{
//         systemTime
//     }
// `;


type ServerInfoProps = {
    dataRef:ServerInfoDataFragment$key;
};

export default function ServerInfo({dataRef}:ServerInfoProps){

    const data = useFragment(ServerInfoDataFragment, dataRef);

    // const uptime_sub_config = useMemo(() => ({
    //     variables: {},
    //     subscription:UptimeSub,
    //     updater: store => { },
    //     onCompleted: () => {} /* Subscription established */,
    //     onError: error => {} /* Subscription errored */,
    //     onNext: response => {} /* Subscription payload received */,
    //   }as GraphQLSubscriptionConfig<ServerInfoUptimeSubscription>), []);
    
    // useSubscription<ServerInfoUptimeSubscription>(uptime_sub_config);

    // const datetime_sub_config = useMemo(() => ({
    //     variables: {},
    //     subscription:DateTimeSub,
    //     updater: store => { },
    //     onCompleted: () => {} /* Subscription established */,
    //     onError: error => {} /* Subscription errored */,
    //     onNext: response => {} /* Subscription payload received */,
    //   }as GraphQLSubscriptionConfig<ServerInfoDateTimeSubscription>), []);
    
    // useSubscription<ServerInfoDateTimeSubscription>(datetime_sub_config);
      

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
        
        <Card className="bg-gray-100">
            <ServerInfoName dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <ServerInfoUptime dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <ServerInfoConfig dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <ServerInfoState dataRef={data}/>
        </Card>
    </div>
}
