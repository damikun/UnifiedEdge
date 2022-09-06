import clsx from "clsx";
import Chart_Y from "../../Images/chart_01.png"
import Chart_X from "../../Images/chart_02.png"

export function MetricTrendPlaceholder(){
  return <div className="flex flex-col w-full space-y-2 h-80">
  <div className={clsx("flex flex-row w-full h-full  animate-pulse",
    "whitespace-pre rounded-sm items-center relative")}>
    <img className="h-60 top-0" src={Chart_Y} />
    <div className="w-full flex">
      <img src={Chart_X} className="flex h-60 w-full" />
    </div>
  </div>
</div>
}