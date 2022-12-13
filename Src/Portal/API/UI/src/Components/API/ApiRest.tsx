import clsx from "clsx";
import React from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { BASE_SERVER_URL, SWAGGER_PATH } from "../../constants";

export default React.memo(ApiRest)

const SWAGGER_ENDPOINT = `${BASE_SERVER_URL}/${SWAGGER_PATH}`

type ApiRestProps = {

}

function ApiRest({}:ApiRestProps) {

  return <div className={clsx("flex relative w-full h-auto",
  "overflow-hidden border-gray-100 max-w-full")}>
    <SwaggerUI requestInterceptor={(request) =>{
        var req = new Request(SWAGGER_ENDPOINT, {
          credentials: "include",
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'X-CSRF': '1'
          },
          })

          return new Promise((resolve, reject) => resolve(req));
  }}
    url={SWAGGER_ENDPOINT} />
  </div>
}