import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../../UIComponents/Section/Section";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { UserGeneralInfoFragment$key } from "./__generated__/UserGeneralInfoFragment.graphql";
import SectionBody from "../../../../UIComponents/Section/SectionBody";


export const UserGeneralInfoFragmentTag = graphql`
  fragment UserGeneralInfoFragment on GQL_User 
  {
    id
    sub
    firstName
    lastName
    userName
  }
`;

export default React.memo(UserGeneralInfo)

type UserGeneralInfoProps = {
  dataRef:UserGeneralInfoFragment$key | null;
}

function UserGeneralInfo({dataRef}:UserGeneralInfoProps) {

  const data = useFragment(UserGeneralInfoFragmentTag, dataRef);

  return <Section 
  name="Profile"
  component={
    <SectionBody>
      <div className={clsx("flex flex-col lg:flex-row lg:space-x-10",
      "justify-between 2xl:justify-start")}>
        <FieldGroup>
          <FieldSection
            variant="flex-row"
            name="First name">
            <div className="font-mono truncate break-all">
              {data?.firstName}
            </div>
          </FieldSection>
          <FieldSection
            variant="flex-row"
            name="Last name">
            <div className="font-mono truncate break-all">
              {data?.lastName}
            </div>
          </FieldSection>
          <FieldSection
            variant="flex-row"
            name="Subject ID">
            <div className="font-mono truncate break-all">
              {data?.sub}
            </div>
          </FieldSection>
        </FieldGroup>
      </div>
    </SectionBody>
  }/>
}