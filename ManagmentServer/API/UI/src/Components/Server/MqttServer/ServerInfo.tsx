export {}

// import clsx from "clsx";
// import { useMemo } from "react";
// import Card from "../../UIComponents/Card/Card";
// import { graphql } from "babel-plugin-relay/macro";
// import Badge from "../../UIComponents/Badged/Badge";
// import { useFragment, useSubscription } from "react-relay";
// import { GraphQLSubscriptionConfig } from "relay-runtime";
// import CardContent from "../../UIComponents/Card/CardContent";
// import { GetUptimeString, GetMqttServerStateBadgetVariant } from "../../Shared/Common";
// import { faClock, faSignsPost, faStopwatch } from "@fortawesome/free-solid-svg-icons";
// import { ServerInfoDataFragment$key } from "./__generated__/ServerInfoDataFragment.graphql";
// import { ServerInfoUptimeSubscription } from "./__generated__/ServerInfoUptimeSubscription.graphql";

// const ServerInfoDataFragment = graphql`
//     fragment ServerInfoDataFragment on Query {
        
//         systemInfo {
//             serverDateTime
//             targetFramework
//             osVersion {
//                 platform
//                 version
//             }
//             uptime {
//                 days
//                 hours
//                 minutes
//             }
//         }
        
//         ServerInfo {
//             name
//             guid
//         }
//     }
// `;

// const UptimeSub = graphql`
//     subscription ServerInfoUptimeSubscription{
//         uptime {
//             hours
//             minutes
//             days
//         }
//     }
// `;

// type ServerInfoProps = {
//     dataRef:ServerInfoDataFragment$key;
// };

// export default function ServerInfo({dataRef}:ServerInfoProps){

//     const data = useFragment(ServerInfoDataFragment, dataRef);

//     const uptime_sub_config = useMemo(() => ({
//         variables: {},
//         subscription:UptimeSub,
//         updater: store => { },
//         onCompleted: () => {} /* Subscription established */,
//         onError: error => {} /* Subscription errored */,
//         onNext: response => {} /* Subscription payload received */,
//       }as GraphQLSubscriptionConfig<ServerInfoUptimeSubscription>), []);
    
//     useSubscription<ServerInfoUptimeSubscription>(uptime_sub_config);
    
//     const server_uptime = useMemo(()=>{
//         return GetUptimeString(
//             data?.systemInfo?.uptime?.days as number,
//             data?.systemInfo?.uptime?.hours  as number,
//             data?.systemInfo?.uptime?.minutes  as number);
//     },[data])

//     const state_variant = useMemo(
//         () => GetMqttServerStateBadgetVariant(data?.state),
//         [data?.state],
//     )

//     return <div className={clsx("grid gap-2 grid-flow-row w-full",
//         "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
//         <Card className="bg-gray-100">
//             <CardContent icon={faSignsPost} title="Name" value={data?.ServerInfo?.name}/>
//         </Card>

//         <Card className="bg-gray-100">
//             <CardContent icon={faStopwatch} title="Uptime" value={server_uptime}/>
//         </Card>

//         <Card className="bg-gray-100">
//             <CardContent icon={faClock} title="Status">
//                 <div className="w-3/12 2xl:w-2/12 flex justify-center text-center">
//                     <Badge
//                         turncate
//                         border={false}
//                         className="text-xxs"
//                         size="thin"
//                         variant={state_variant}
//                     >
//                         {data?.state}
//                     </Badge>
//                 </div>
//             </CardContent>
//         </Card>
//     </div>
// }

