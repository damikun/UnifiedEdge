import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../UIComponents/Card/CardContent";
import { ServerInfoNameDataFragment$key } from "./__generated__/ServerInfoNameDataFragment.graphql";

const ServerInfoNameDataFragment = graphql`
    fragment ServerInfoNameDataFragment on GQL_IServer
    {
        name
    }
`;

type ServerInfoNameProps = {
    dataRef:ServerInfoNameDataFragment$key;
};

export default function ServerInfoName({dataRef}:ServerInfoNameProps){

    const data = useFragment(ServerInfoNameDataFragment, dataRef);

    return <CardContent icon={faSignsPost} title="Name" value={data.name}/>
}