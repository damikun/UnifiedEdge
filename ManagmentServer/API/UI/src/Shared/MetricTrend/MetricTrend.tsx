import { LinkedList } from "../LinkedList";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useReducer } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import {AreaSeries, Axis, Chart, CurveType, LIGHT_THEME, Position, ScaleType, Settings, TickFormatterOptions, TooltipType} from "@elastic/charts"

import "@elastic/charts/dist/theme_only_light.css";
import { MetricTrendHistoryFragment$key } from "./__generated__/MetricTrendHistoryFragment.graphql";
import { GQL_RuntimeMetricSource, MetricTrendSubscription } from "./__generated__/MetricTrendSubscription.graphql";

const horizontalGridLineStyle = { stroke: 'black', strokeWidth: 0.15, opacity: 1 };
const dataInk = 'rgba(96, 146, 192, 1)';

const MetricTrendHistoryFragment = graphql`
    fragment MetricTrendHistoryFragment on GQL_RuntimeMetrics
    @argumentDefinitions(
      type: {type: "GQL_RuntimeMetricSource"},
    ) {
      metricHistory(name: $type) {
        timeStamp
        value
      }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MetricTrendSubscriptionRef = graphql`
    subscription MetricTrendSubscription($props:GQL_RuntimeMetricSource!) {
        runtimeMetric(source: $props) {
          timeStamp
          id
          name
          value
        }
    }
`;

type MetricTrendProps = {
  name:string;
  scale: TickScale
  curve?:CurveType,
  yAxisTitle?:string,
  dataRef:MetricTrendHistoryFragment$key | null,
  subSource:GQL_RuntimeMetricSource
}

export type ChartData = {
  timeStamp:string,
  value:number
}

export type TickScale = "number" | "decimal" | "percentage"

export type NormalisedData = {
  min : number,
  max: number,
  scaled_min: number,
  scaled_max: number,
  data:(string | number)[][]
  last:number
}

export const DEFAULT_SCALE = {
  min:0,
  max:0,
  data:[],
  scaled_min:0,
  scaled_max:0,
  last:0
} as NormalisedData

export default function MetricTrend({
  name,
  dataRef,
  subSource,
  scale = "decimal",
  curve = CurveType.CURVE_MONOTONE_X,
  yAxisTitle}:MetricTrendProps){

  const gql_data = useFragment(MetricTrendHistoryFragment, dataRef);

  const [time_serie, dispatch] = useReducer(
    metricReducer,InitMetricsBuffer(gql_data?.metricHistory));

  const subscription_cfg = useMemo(() => ({
    variables: {props: subSource},
    subscription:MetricTrendSubscriptionRef,
    updater: (store, data) =>{
      if(data && data.runtimeMetric.timeStamp){
        dispatch({
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            type:LinkedListActionKind.Add,
            payload:{
                timeStamp:data.runtimeMetric.timeStamp,
                value:data.runtimeMetric.value
            }
        })
    }
    },
  } as GraphQLSubscriptionConfig<MetricTrendSubscription>), []);

  useSubscription<MetricTrendSubscription>(subscription_cfg);

  const normalised_data = useMemo(() => {

      const list_data = time_serie.data.traverse()

      if(list_data === null || list_data === undefined){
          return DEFAULT_SCALE
      }

      var min = Number.MAX_SAFE_INTEGER;
      var max = Number.MIN_SAFE_INTEGER;

      var result = list_data.filter(x => !!x && !!x.timeStamp && x.value !== null)
      .map(e=> {
          const date = new Date(e?.timeStamp);

          if(e.value < min){
              min = e.value;
          }

          if(e.value > max){
              max = e.value;
          }

          return  [
              date.toLocaleTimeString('en-US', { hour12: false }),
              e?.value? Number(e?.value): 0
          ]
      })
  
      if(result === undefined){
          return DEFAULT_SCALE
      }else{

        // const last = time_serie.data.lastNode();

          return { 
              min:min,
              max:max,
              data:result,
              scaled_min: min-min*0.02,
              scaled_max: max+max*0.02,
              last:0
              // last: last ? last.data.value : 0
          } as NormalisedData
      }

  }, [time_serie])

  const y_domain = useMemo(() => {
       return {
          min:normalised_data.scaled_min,
          max:normalised_data.scaled_max
      }
  }, [normalised_data.scaled_min, normalised_data.scaled_max])

  const scaleCallback = useCallback(
      (value: any, options?: TickFormatterOptions | undefined): string => {
          return GetTickFormat(scale,value)
    },
    [scale],
  )
  
  return <div className="flex flex-col w-full space-y-2 h-96">
        <div className="flex font-semibold text-gray-700">{name}</div>

        <div className="flex w-full h-full">
            {
            //@ts-ignore
            <Chart className="h-full w-full z-0">
                <Settings
                    baseTheme={LIGHT_THEME}
                    showLegendExtra
                    animateData
                    tooltip={TooltipType.VerticalCursor}
                />
                
                <Axis
                    id="bottom"
                    position={Position.Bottom}
                    showOverlappingTicks={false}
                />

                <Axis
                    id="left"
                    title={yAxisTitle}
                    showGridLines
                    ticks={5}
                    domain={y_domain}
                    gridLine={horizontalGridLineStyle}
                    position={Position.Left}
                    tickFormat={scaleCallback}
                />

                <AreaSeries
                    id={"1m"}
                    xScaleType={ScaleType.Time}
                    yScaleType={ScaleType.Linear}
                    xAccessor={0}
                    yAccessors={[1]}
                    yNice
                    xNice
                    color={dataInk}
                    data={normalised_data.data}
                    curve={curve}
                />
            </Chart>
            }
        </div>

    </div>

}

// ----------------------------------

export enum LinkedListActionKind {
  Add = 'ADD',
}

export interface LinkedListAction {
  type: LinkedListActionKind;
  payload: ChartData;
}

export function metricReducer(state:{timestamp:string,data:LinkedList<ChartData>}, action:LinkedListAction) {
  switch (action.type) {
    case LinkedListActionKind.Add:

    if(state.data.size() > 100){
      state.data.deleteFirst();
      state.data.insertAtEnd(action.payload)
    }else{
      state.data.insertAtEnd(action.payload)
    }
      return {
        timestamp:action.payload.timeStamp,
        data:state.data
      }
      
    default:
      throw new Error();
  }
}

// ----------------------------------

function GetTickFormat(scale:TickScale, num:any){
  switch (scale) {
      case "decimal":
          return Number(num).toFixed(2);
      case "number":
          return`${Number(num).toFixed(1)}%`
      case "percentage":
          return Number(num).toFixed(0);

      default:
          return Number(num).toFixed(2);
  }
}

// ----------------------------------

function InitMetricsBuffer(data: ReadonlyArray<{
  readonly timeStamp: any | null;
  readonly value: any | null;
} | null> | null | undefined){
  const linked_list = new LinkedList<ChartData>();

  data?.forEach(e=>{
      linked_list.insertAtEnd({timeStamp:e?.timeStamp,value:e?.value})
  });
  
  return {timestamp:"", data:linked_list}
}