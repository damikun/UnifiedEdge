import clsx from "clsx";
import React from "react";

export default React.memo(ApiTokensInfo)


function ApiTokensInfo() {

  return  <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
  "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2",)}>
    <div className="w-full py-3 flex flex-col space-y-2">

      <div className="flex flex-row flex-nowrap items-center text-gray-600">
        {/* <FontAwesomeIcon icon={faCircleInfo} className="mr-2" /> */}
        <span className="font-semibold">
          Personal access token (PAT)
        </span>
      </div>

      <ul className="list-disc list-inside">
        <li>
          Alternative to <i className="italic">OAuth2</i> for <i className="italic">Graphql</i> or <i className="italic">Rest API</i> ussage.
        </li>
        <li>
          These tokens are scoped to current user, with permissions, 
          and expire in a defined time.
        </li>
        <li>
          Always store this tokens at a safe place as secret. Don't use it with public clients!
        </li>
      </ul>

    </div>
  </div>
}