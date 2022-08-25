import clsx from "clsx";
import { useFragment } from "react-relay";
import { CurveType} from "@elastic/charts"
//@ts-ignore
import { Suspense } from "react";
import Card from "../../UIComponents/Card/Card";
import { graphql } from "babel-plugin-relay/macro";
import MetricTrend  from "../../Shared/MetricTrend/MetricTrend";
import { EdgeMetricsFragment$key } from "./__generated__/EdgeMetricsFragment.graphql";
import { MetricTrendPlaceholder } from "../../Shared/MetricTrend/MetricTrendPlaceholder";

const EdgeMetricsFragment = graphql`
    fragment EdgeMetricsFragment on Query {
        
        Memory: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: PAGED_MEMORY) @defer(label: "DeferedMemoryHistory")
        }

        Threads: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: THREAD_COUNT) @defer(label: "DeferedThreadHistory")
        }

        Cpu: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: TOTAL_CPU_USED) @defer(label: "DeferedCpuHistory")
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MetricFragment = graphql`
    fragment EdgeMetricsData on GQL_Metric {
        timeStamp
        id
        name
        value
    }
`;

type EdgeMetricsProps = {
    dataRef:EdgeMetricsFragment$key | null;
};

export default function EdgeMetrics({dataRef}:EdgeMetricsProps){

    const gql_data = useFragment(EdgeMetricsFragment, dataRef);

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 lg:grid-cols-2 flex-wrap z-0")}>

        {/* <SuspenseList revealOrder={"together"}> */}
            <Card className="bg-gray-100">
                {/* <Suspense fallback={<MetricTrendPlaceholder/>}> */}
                    <MetricTrend
                        scale="percentage"
                        name="Edge Cpu"
                        subSource="TOTAL_CPU_USED"
                        dataRef={gql_data?.Cpu?gql_data?.Cpu:null}
                    />
                {/* </Suspense> */}
            </Card>

            <Card className="bg-gray-100">
                {/* <Suspense fallback={<MetricTrendPlaceholder/>}> */}
                    <MetricTrend
                        curve={CurveType.CURVE_STEP}
                        scale="number"
                        name="Edge Memory"
                        subSource="PAGED_MEMORY"
                        dataRef={gql_data?.Memory?gql_data?.Memory:null}
                    />
                {/* </Suspense> */}
            </Card>

            <Card className="bg-gray-100">
                {/* <Suspense fallback={<MetricTrendPlaceholder/>}> */}
                    <MetricTrend
                        curve={CurveType.CURVE_STEP}
                        scale="number"
                        name="Edge Threads"
                        subSource="THREAD_COUNT"
                        dataRef={gql_data?.Threads?gql_data?.Threads:null}
                    />
                {/* </Suspense> */}
            </Card>
        {/* </SuspenseList> */}
    </div>
}