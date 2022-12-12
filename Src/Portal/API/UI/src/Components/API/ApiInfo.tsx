import clsx from "clsx";
import React from "react";
import ApiInfoRest from "./ApiInfoRest";
import { useFragment } from "react-relay";
import ApiInfoGraphql from "./ApiInfoGraphql";
import Card from "../../UIComponents/Card/Card";
import { graphql } from "babel-plugin-relay/macro";
import CardContent from "../../UIComponents/Card/CardContent";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { ApiInfoFragment$key } from "./__generated__/ApiInfoFragment.graphql";


export const ApiInfoFragmentTag = graphql`
  fragment ApiInfoFragment on GQL_Edge 
  {
    id
    name
    ...ApiInfoGraphqlFragment
    ...ApiInfoRestFragment
  }
`;

export default React.memo(ServerSharedInfo)

type ServerSharedInfoProps = {
  dataRef:ApiInfoFragment$key | null;
}

function ServerSharedInfo({dataRef}:ServerSharedInfoProps) {

  const data = useFragment(ApiInfoFragmentTag, dataRef);
  
  return <div className={clsx("grid gap-2 grid-flow-row w-full",
  "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
  
  <Card className="bg-gray-50">
    <CardContent
      icon={faSignsPost}
      title="Name"
      value={data?.name}
    />
  </Card>

  <Card className="bg-gray-50">
    <ApiInfoGraphql dataRef={data}/>
  </Card>

  <Card className="bg-gray-50">
    <ApiInfoRest dataRef={data}/>
  </Card>

</div>
}