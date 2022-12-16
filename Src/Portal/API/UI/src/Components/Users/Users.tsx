import { useLazyLoadQuery } from "react-relay";
import WebHookList from "./UserList/UserList";
import { graphql } from "babel-plugin-relay/macro";
import WebHookListBar from "./UserList/UserListBar";
import Section from "../../UIComponents/Section/Section";
import { UsersQuery } from "./__generated__/UsersQuery.graphql";
import { UserListCtxProvider } from "./UserList/UserListCtxProvider";


const UsersQueryTag = graphql`
    query UsersQuery {
        ...UserListDataFragment
    }
`;

export default function Users(){

    const data = useLazyLoadQuery<UsersQuery>(
        UsersQueryTag,
        {},
        {
            fetchPolicy: "store-and-network",
            UNSTABLE_renderPolicy: "partial"
        },
    );

    return <>
        <UserListCtxProvider>
            <Section 
                name="Users"
                bar={<WebHookListBar/>}
                component={<WebHookList dataRef={data} />}
            />
        </UserListCtxProvider>
    </>
}
