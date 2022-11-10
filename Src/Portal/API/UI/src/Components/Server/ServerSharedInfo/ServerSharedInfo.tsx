import clsx from "clsx";
import React from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../../UIComponents/Section/Section";
import { ServerSharedInfoFragment$key } from "./__generated__/ServerSharedInfoFragment.graphql";


export const ServerSharedInfoFragmentTag = graphql`
  fragment ServerSharedInfoFragment on GQL_IServer 
  {
    id
  }
`;

export default React.memo(ServerSharedInfo)

type ServerSharedInfoProps = {
  dataRef:ServerSharedInfoFragment$key | null;
}

function ServerSharedInfo({dataRef}:ServerSharedInfoProps) {

  const data = useFragment(ServerSharedInfoFragmentTag, dataRef);
  
  return <>
  {
    data && <Section 
      component={
        <div className={clsx("flex bg-gray-50 flex-col w-full pt-4",
        "border border-gray-200 rounded-md shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-lg w-full">
            {/* <ServerName dataRef={data}/>
            <ServerDescription dataRef={data}/>
            <ServerLocation dataRef={data}/> */}
          </div>
        </div>
      }
    />
  }
  </>
}