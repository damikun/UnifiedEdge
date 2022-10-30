import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import WebHookList from "./WebHookList/WebHookList";
import Section from "../../UIComponents/Section/Section";
import WebHookListBar from "./WebHookList/ServerListBar";
import { WebHooksQuery } from "./__generated__/WebHooksQuery.graphql";
import { WebHookListCtxProvider } from "./WebHookList/WebHookListCtxProvider";


const WebHooksQueryTag = graphql`
    query WebHooksQuery {
        ...WebHookListDataFragment
    }
`;

export default function WebHooks(){

    const data = useLazyLoadQuery<WebHooksQuery>(
        WebHooksQueryTag,
        {},
        {
            fetchPolicy: "store-and-network",
            UNSTABLE_renderPolicy: "partial"
        },
    );

    return <>
        <WebHookListCtxProvider>
            <Section 
                name="WebHooks"
                bar={<WebHookListBar/>}
                component={<WebHookList dataRef={data} />}
            />
        </WebHookListCtxProvider>
    </>
}
