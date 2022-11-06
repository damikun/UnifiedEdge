import clsx from "clsx";
import UserUid from "./UserName";
import UserActiv from "./UserActiv";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Card from "../../../../UIComponents/Card/Card";
import { UserInfoBarDataFragment$key } from "./__generated__/UserInfoBarDataFragment.graphql";


const UserInfoBarDataFragment = graphql`
    fragment UserInfoBarDataFragment on GQL_User {
        ...UserNameDataFragment
        ...UserActivDataFragment
    }
`;

type UserInfoBarProps = {
    dataRef:UserInfoBarDataFragment$key;
};

export default function UserInfoBar({dataRef}:UserInfoBarProps){

    const data = useFragment(UserInfoBarDataFragment, dataRef);

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
        
        <Card className="bg-gray-100">
            <UserUid dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <UserActiv dataRef={data}/>
        </Card>
    </div>
}
