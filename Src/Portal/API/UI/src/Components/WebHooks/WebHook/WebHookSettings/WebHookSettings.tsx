import clsx from "clsx";
import React from "react";
import WebHookRemove from "./WebHookRemove";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import WebHookUrlSetting from "./WebHookUrlSetting";
import WebHookNameSetting from "./WebHookNameSetting";
import WebHookActivSetting from "./WebHookActivSetting";
import WebHookSecretSetting from "./WebHookSecretSetting";
import Section from "../../../../UIComponents/Section/Section";
import WebHookEventGroupsSetting from "./WebHookEventGroupsSetting";
import { WebHookSettingsQuery } from "./__generated__/WebHookSettingsQuery.graphql";


export const WebHookSettingsQueryTag = graphql`
  query WebHookSettingsQuery($hook_id:ID!) 
  {
    webHookById(hook_id:$hook_id){
      id
      ...WebHookNameSettingDataFragment
      ...WebHookUrlSettingDataFragment
      ...WebHookSecretSettingDataFragment
      ...WebHookActivSettingDataFragment
      ...WebHookEventGroupsSettingDataFragment
      ...WebHookRemoveDataFragment
    }
  }
`;

export default React.memo(WebHookSettings)

function WebHookSettings() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<WebHookSettingsQuery>(
    WebHookSettingsQueryTag,
    {hook_id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    {
      data && <>
       <Section 
        component={
          <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
          "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
            <div className="max-w-2xl w-full">
              <WebHookActivSetting dataRef={data.webHookById}/>
              <WebHookNameSetting dataRef={data.webHookById}/>
              <WebHookUrlSetting dataRef={data.webHookById}/>
              <WebHookSecretSetting dataRef={data.webHookById}/>
              <WebHookEventGroupsSetting dataRef={data.webHookById}/>
            </div>
          </div>
        }
      />

      <Section 
        name="Remove WebHook"
        component={
          <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
          "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
            <div className="max-w-2xl w-full">
              <WebHookRemove dataRef={data.webHookById}/>
            </div>
          </div>
        }
      />
      </>
    }
  </>
} 