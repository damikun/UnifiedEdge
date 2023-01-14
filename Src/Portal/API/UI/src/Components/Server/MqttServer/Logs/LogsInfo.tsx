import clsx from "clsx";
import React from "react";

export default React.memo(LogsInfo)


function LogsInfo() {

  return  <div className={clsx("flex bg-gray-50 flex-col w-full",
  "border border-gray-200 rounded-lg shadow-sm pt-2 px-5 py-3 space-y-2",)}>
    <div className="w-full py-3 flex flex-col space-y-2 bg-info-background bg-contain">

      <div className="flex flex-row items-center justify-between">

        <div className="w-full py-3 flex flex-col space-y-2 2xl:w-7/12">
          <span className="font-semibold">Aplication logs</span>
          <ul className="list-disc list-inside">
            <li>
              Asynchronus logs used by portal
            </li>
          </ul>

          <span className="font-semibold">Server Instance logs</span>
          <ul className="list-disc list-inside">
            <li>
              Realtime mqtt server instance logs. <span className="text-gray-500 text-sm">(Recomended only for debugging)</span>
            </li>
          </ul>
          
          </div>
      </div>

 
    </div>
  </div>
}