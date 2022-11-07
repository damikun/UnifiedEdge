import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import WebHookGeneralInfo from "./WebHookGeneralInfo";
import WebHookRecordList from "../../WebHookRecordList/WebHookRecordList";
import { WebHookInfoQuery } from "./__generated__/WebHookInfoQuery.graphql";


export const WebHookInfoQueryTag = graphql`
  query WebHookInfoQuery($id:ID!) 
  {
    ...WebHookRecordListPaginationFragment @arguments(hook_id:$id)

    webHookById(hook_id:$id) {
      ...WebHookGeneralInfoFragment
    }
  }
`;

export default React.memo(WebHookInfo)

function WebHookInfo() {

  const { id }: any = useParams<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hook_id, setHook_id] = useState(id)

  const data = useLazyLoadQuery<WebHookInfoQuery>(
    WebHookInfoQueryTag,
    {id:hook_id},
    {
      fetchPolicy: "store-and-network"
    },
  );

  return <>
    <WebHookGeneralInfo dataRef={data.webHookById}/>
    <WebHookRecordList dataRef={data}/>
  </>
} 