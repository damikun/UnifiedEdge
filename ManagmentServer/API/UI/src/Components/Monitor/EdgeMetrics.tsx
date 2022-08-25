import clsx from "clsx";
import { useFragment } from "react-relay";
import { CurveType} from "@elastic/charts"
import Card from "../../UIComponents/Card/Card";
import { graphql } from "babel-plugin-relay/macro";
import MetricTrend  from "../../Shared/MetricTrend";
import { EdgeMetricsFragment$key } from "./__generated__/EdgeMetricsFragment.graphql";

import "@elastic/charts/dist/theme_only_light.css";

const EdgeMetricsFragment = graphql`
    fragment EdgeMetricsFragment on Query {
        Memory: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: PAGED_MEMORY) 
        }

        Threads: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: THREAD_COUNT) 
        }

        Cpu: runtimeMetrics {
            ...MetricTrendHistoryFragment @arguments(type: TOTAL_CPU_USED) 
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
        <Card className="bg-gray-100">
            <MetricTrend
                scale="percentage"
                name="Edge Cpu"
                dataRef={gql_data?.Cpu?gql_data?.Cpu:null}
            />
        </Card>

        <Card className="bg-gray-100">
            <MetricTrend
                curve={CurveType.CURVE_STEP}
                scale="number"
                name="Edge Memory"
                dataRef={gql_data?.Memory?gql_data?.Memory:null}
            />
        </Card>

        <Card className="bg-gray-100">
            <MetricTrend
                curve={CurveType.CURVE_STEP}
                scale="number"
                name="Edge Threads"
                dataRef={gql_data?.Threads?gql_data?.Threads:null}
            />
        </Card>
    </div>
}