import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import CardContent from "../../../../UIComponents/Card/CardContent";
import { UserNameDataFragment$key } from "./__generated__/UserNameDataFragment.graphql";


const UserNameDataFragment = graphql`
    fragment UserNameDataFragment on GQL_User
    {   
        userName
    }
`;

type UserNameProps = {
    dataRef:UserNameDataFragment$key;
};

export default function UserName({dataRef}:UserNameProps){

    const data = useFragment(UserNameDataFragment, dataRef);

    return <CardContent icon={faSignsPost} title="User name" value={data.userName}/>
}