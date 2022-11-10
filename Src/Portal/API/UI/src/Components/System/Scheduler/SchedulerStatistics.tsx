import clsx from "clsx";
import { useMemo } from "react";
import { useFragment } from "react-relay/hooks";
import { graphql } from "babel-plugin-relay/macro";
import { AnimatePresence, motion } from "framer-motion";
import {
  Chart,
  Axis,
  BarSeries,
  Position,
  ScaleType,
  Settings,
} from "@elastic/charts";
import { SchedulerStatisticsFragment_jobsStatistic$key } from "./__generated__/SchedulerStatisticsFragment_jobsStatistic.graphql";
import "@elastic/charts/dist/theme_only_light.css";


const SchedulerStatisticsTag = graphql`
  fragment SchedulerStatisticsFragment_jobsStatistic on Query {
    jobsStatistic {
      recentFailedByDate {
        date
        count
      }
      recentSucceededByDate {
        date
        count
      }
    }
  }
`;

export type SchedulerStatisticsProps = {
  dataRef: SchedulerStatisticsFragment_jobsStatistic$key | null;
};

export default function SchedulerStatistics({
  dataRef,
}: SchedulerStatisticsProps) {

  const data = useFragment(SchedulerStatisticsTag, dataRef);

  const chartData = useMemo(() => {
    if (!data?.jobsStatistic?.recentSucceededByDate) {
      return [];
    }

    return data?.jobsStatistic?.recentSucceededByDate
      ?.filter((e) => e?.date !== undefined && e.date !== null)
      .reverse()
      .map((enity) => {
        const date = new Date(enity?.date!);

        const y2_value = data?.jobsStatistic?.recentFailedByDate?.find(
          (e) => e?.date === enity?.date
        )?.count;

        return {
          x: date.toLocaleDateString(),
          y1: enity?.count as number,
          y2: y2_value ? y2_value : 0,
        };
      });
  }, [data]);

  return (<AnimatePresence>
    <motion.div className={clsx("flex w-full h-72 bg-gray-50 p-2 lg:p-5 border",
    "border-gray-200 rounded-md shadow-sm")}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    transition={{duration:0.5}}>
      {
      //@ts-ignore
      <Chart className="story-chart h-full w-full">
        <Settings showLegendExtra legendPosition={Position.Right} />
        <Axis id="bottom" position={Position.Bottom} showOverlappingTicks />
        <Axis id="left2" position={Position.Left} tickFormat={(d: any) => d} />

        <BarSeries
          id="Success"
          xScaleType={ScaleType.Ordinal}
          yScaleType={ScaleType.Log}
          xAccessor="x"
          color={["#78eda3"]}
          yAccessors={["y1"]}
          data={chartData}
        />
        <BarSeries
          id="Failed"
          xScaleType={ScaleType.Ordinal}
          yScaleType={ScaleType.Log}
          xAccessor="x"
          color={["#EF4444"]}
          yAccessors={["y2"]}
          data={chartData}
        />
      </Chart>
        }
    </motion.div>
    </AnimatePresence>
  );
}

///////////////////////////////////
