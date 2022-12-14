import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import SectionBody from "../../../../UIComponents/Section/SectionBody";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { UserClaimsInfoFragment$key } from "./__generated__/UserClaimsInfoFragment.graphql";


export const UserClaimsInfoFragmentTag = graphql`
  fragment UserClaimsInfoFragment on Query
  @argumentDefinitions(
    user_id: { type: "ID!" }
  )
  {
    userClaims(user_id:$user_id){
      type
      value
    }
  }
`;

export default React.memo(UserClaimsInfo)

type UserClaimsInfoProps = {
  dataRef:UserClaimsInfoFragment$key | null;
}

function UserClaimsInfo({dataRef}:UserClaimsInfoProps) {

  const data = useFragment(UserClaimsInfoFragmentTag, dataRef);

  return <Section 
  name="Claims"
  component={
    <SectionBody>
      <div className={clsx("flex flex-col lg:flex-row lg:space-x-10",
      "justify-between 2xl:justify-start")}>
        <FieldGroup>
          {
            data?.userClaims.filter(e=>
              e.type !== "scope" && 
              e.type !== "sub")
            .map((enity,index)=>{
              return enity && enity.type? <FieldSection
              key={index}
              variant="flex-row"
              name={enity?.type}>
              <div className="font-mono truncate break-all">
                {enity?.value}
              </div>
            </FieldSection>:<></>
            })
          }
        </FieldGroup>
      </div>
    </SectionBody>
  }/>
}