import { faAtom, faDesktop, faMemory, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import Card from "../../UIComponents/Card/Card";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { useMemo } from "react";
import clsx from "clsx";
import { ResourcesDataFragment$key } from "./__generated__/ResourcesDataFragment.graphql";
import CardContent from "../../UIComponents/Card/CardContent";

const ResourcesDataFragment = graphql`
    fragment ResourcesDataFragment on Query {
        runtimeMetrics {

            cpuMetrics {
                totalCpuUsed
                threadCount
            }

            memoryMetrics {
                memoryUssage
            }
        }
        
        systemInfo {
            processName
        }
    }
`;

type ResourcesProps = {
    dataRef:ResourcesDataFragment$key | null;
  };

export default function Resources({dataRef}:ResourcesProps){

    const data = useFragment(ResourcesDataFragment, dataRef);

    const res_mem = useMemo(()=>{
        return `${data?.runtimeMetrics?.memoryMetrics?.memoryUssage}Mb`
    },[data])

    const res_cpu = useMemo(()=>{
        return `${data?.runtimeMetrics?.cpuMetrics?.totalCpuUsed}%`
    },[data])
    
    const res_threads = useMemo(()=>{
        return `${data?.runtimeMetrics?.cpuMetrics?.threadCount}`
    },[data])

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
        <Card>
            <CardContent icon={faMicrochip} title="Process" value={data?.systemInfo?.processName}/>
        </Card>

        <Card>
            <CardContent icon={faMemory} title="Memory" value={res_mem}/>
        </Card>

        <Card>
            <CardContent icon={faDesktop} title="Cpu" value={res_cpu}/>
        </Card>

        <Card>
            <CardContent icon={faAtom} title="Threads" value={res_threads}/>
        </Card>
    </div>
}

function GetUptimeString(
    days:number|null|undefined,
    hours:number|null|undefined,
    minutes:number|null|undefined):string {

    if(days && days > 0){
        return `${days}d ${hours}h ${minutes}m`
    }else if(hours && hours > 0){
        return `${hours}h ${minutes}m`
    }else if(minutes){
        return `${minutes}m`
    }else{
        return ""
    }
    
}