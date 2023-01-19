import Notes from "./Notes/Notes";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import PageContainer from "../Layout/PageContainer";
import { DocumentsQuery } from "./__generated__/DocumentsQuery.graphql";


const DocumentsQueryTag = graphql`
    query DocumentsQuery {
        ...NotesPaginationFragment
    }
`;

export default function Documents(){

    const data = useLazyLoadQuery<DocumentsQuery>(
        DocumentsQueryTag,
        {},
        {
            fetchPolicy: "store-and-network",
            UNSTABLE_renderPolicy: "partial"
        },
    );

    return <PageContainer>
        <Notes dataRef={data}/>
    </PageContainer>
}