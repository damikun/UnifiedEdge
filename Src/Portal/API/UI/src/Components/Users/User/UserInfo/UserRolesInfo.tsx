import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../../UIComponents/Badged/Badge";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup } from "../../../../Shared/Field/FieldHelpers";
import { UserRolesInfoFragment$key } from "./__generated__/UserRolesInfoFragment.graphql";
import SectionBody from "../../../../UIComponents/Section/SectionBody";


export const UserRolesInfoFragmentTag = graphql`
  fragment UserRolesInfoFragment on Query
  @argumentDefinitions(
    user_id: { type: "ID!" }
  )
  {
    userRoles(user_id:$user_id)
  }
`;

export default React.memo(UserRolesInfo)

type UserRolesInfoProps = {
  dataRef:UserRolesInfoFragment$key | null;
}

function UserRolesInfo({dataRef}:UserRolesInfoProps) {

  const data = useFragment(UserRolesInfoFragmentTag, dataRef);

  return <Section 
  name="Roles"
  component={
    <SectionBody>
      <div className={clsx("flex flex-col lg:flex-row lg:space-x-10",
      "justify-between 2xl:justify-start")}>
        <FieldGroup>
          <div className="flex flex-row flex-wrap">
            {
              data?.userRoles.map((role,index)=>{
                return role ? 
                <div className="mr-2 py-2" key={index}>
                  <Badge
                  variant="secondarygray">
                    {role}
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