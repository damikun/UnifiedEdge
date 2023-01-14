import clsx from "clsx";
import React from "react";

export default React.memo(AuthInfo)


function AuthInfo() {

  return  <div className={clsx("flex bg-gray-50 flex-col w-full",
  "border border-gray-200 rounded-lg shadow-sm pt-2 px-5 py-3 space-y-2",)}>
    <div className="w-full py-3 flex flex-col space-y-2 bg-info-background bg-contain">

      <div className="flex flex-row items-center justify-between">

        <div className="w-full py-3 flex flex-col space-y-2 2xl:w-7/12">
          <span className="font-semibold">Auth Clients</span>
          <ul className="list-disc list-inside">
            <li>
              Allowed clients identifiers. <span className="text-gray-500 text-sm">(white-listed)</span>
            </li>
          </ul>

          <span className="font-semibold">Auth Users</span>
          <ul className="list-disc list-inside">
            <li>
              Authentication using <b className="font-semibold">Username</b> and <b className="font-semibold">Password</b> <span className="text-gray-500 text-sm">(Require MQTT v.5)</span>
            </li>
            <li>
              Authentication using <b className="font-semibold">Username</b>={"OpenId"} and <b className="font-semibold">Password</b>={"{TOKEN}"} <span className="text-gray-500 text-sm">(Require MQTT v.5 and OpenId PAT)</span>
            </li>
          </ul>
          
          </div>
      </div>
    </div>
  </div>
}