import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../../UIComponents/Badged/Badge";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { WebHookGeneralInfoFragment$key } from "./__generated__/WebHookGeneralInfoFragment.graphql";


export const WebHookGeneralInfoFragmentTag = graphql`
  fragment WebHookGeneralInfoFragment on GQL_WebHook 
  {
    id
    uid
    webHookUrl
    eventGroup
  }
`;

export default React.memo(WebHookGeneralInfo)

type WebHookGeneralInfoProps = {
  dataRef:WebHookGeneralInfoFragment$key | null;
}

function WebHookGeneralInfo({dataRef}:WebHookGeneralInfoProps) {

  const data = useFragment(WebHookGeneralInfoFragmentTag, dataRef);

  return <Section 
  name="General"
  component={
  <div className={clsx("flex bg-gray-50 flex-col w-full",
    "border border-gray-200 rounded-md shadow-sm p-5 space-y-2")}>
    <div className={clsx("flex flex-col lg:flex-row lg:space-x-10",
    "justify-between 2xl:justify-start")}>
      <FieldGroup>
        <FieldSection
          variant="flex-row"
          name="Uid">
          <div className="font-mono">
            {data?.uid}
          </div>
        </FieldSection>
        <FieldSection
          variant="flex-row"
          name="Endpoint URL">
          <div className="font-mono truncate break-all">
            {data?.webHookUrl}
          </div>
        </FieldSection>

        <FieldSection
          variant="flex-row"
          name="Triger Groups">
            <div className="flex flex-row flex-wrap items-center">
            {  
              data?.eventGroup &&  data?.eventGroup.length > 0 ?
                data?.eventGroup.map((e,i)=>{
                  return <div key={i} className="mr-2">
                  <Badge
                    size="thin"
                    variant="secondarygray">
                      {e}
                  </Badge>
                  </div>           
                }) :
                "None"
            }
            </div>
        </FieldSection>
      </FieldGroup>
    </div>
  </div>
  }/>
}