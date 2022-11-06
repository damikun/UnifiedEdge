import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../../UIComponents/Badged/Badge";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../../UIComponents/Card/CardContent";
import { UserActivDataFragment$key } from "./__generated__/UserActivDataFragment.graphql";


const UserActivDataFragment = graphql`
    fragment UserActivDataFragment on GQL_User
    {   
        enabled
    }
`;

type UserActivProps = {
    dataRef:UserActivDataFragment$key;
};

export default function UserActiv({dataRef}:UserActivProps){

    const data = useFragment(UserActivDataFragment, dataRef);

    return <CardContent icon={faPlug} title="State" value={
        <Badge 
            size="thin"
            variant={data.enabled?"primarygreen":"primaryred"}>
            {data.enabled?"Enabled":"Disabled"}
        </Badge>
    }/>
}