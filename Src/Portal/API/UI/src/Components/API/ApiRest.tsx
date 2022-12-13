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

  return <div className={clsx("block relative w-full h-auto",
  "")}>
    <SwaggerUI 
    requestInterceptor={(request) =>{

      if(request.url === SWAGGER_ENDPOINT){
        var req = new Request(SWAGGER_ENDPOINT, {
          credentials: "include",
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'X-CSRF': '1'
          },
          })

          return req;
      }

      return request;

  }}
    url={SWAGGER_ENDPOINT} />
  </div>
}