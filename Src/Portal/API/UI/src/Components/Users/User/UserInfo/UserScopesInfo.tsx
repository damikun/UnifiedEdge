import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../../UIComponents/Badged/Badge";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup } from "../../../../Shared/Field/FieldHelpers"
import SectionBody from "../../../../UIComponents/Section/SectionBody";
import { UserScopesInfoFragment$key } from "./__generated__/UserScopesInfoFragment.graphql";


export const UserScopesInfoFragmentTag = graphql`
  fragment UserScopesInfoFragment on Query
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

export default React.memo(UserScopesInfo)

type UserScopesInfoProps = {
  dataRef:UserScopesInfoFragment$key | null;
}

function UserScopesInfo({dataRef}:UserScopesInfoProps) {

  const data = useFragment(UserScopesInfoFragmentTag, dataRef);

  return <Section 
  name="Scopes"
  component={
    <SectionBody>
      <div className={clsx("flex flex-col lg:flex-row lg:space-x-10",
      "justify-between 2xl:justify-start")}>
        <FieldGroup>
          <div className="flex flex-row flex-wrap">
            {
              data?.userClaims.filter(e=>e.type === "scope")
              .map((scope,index)=>{
                return scope ? 
                <div className="mr-2 py-2" key={index}>
                  <Badge
                  variant="secondarygray">
                    {scope.value}
                  </Badge>
                </div> : <></>
              })
            }
          </div>
        </FieldGroup>
      </div>
    </SectionBody>
  }/>
}