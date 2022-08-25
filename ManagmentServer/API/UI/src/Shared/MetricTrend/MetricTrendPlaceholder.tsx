import clsx from "clsx";

export function MetricTrendPlaceholder(){
  return <div className="flex flex-col w-full space-y-2 h-96">
  <div className={clsx("flex font-semibold text-gray-700 whitespace-pre",
    "h-5 w-16 bg-gray-200 rounded-sm")}/>

  <div className={clsx("w-full h-full bg-gray-200 animate-pulse",
    "whitespace-pre rounded-sm")}/>
</div>
}