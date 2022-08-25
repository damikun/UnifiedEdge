export{}

// import EdgeInfo from "./ServerInfo";
// import { useLazyLoadQuery } from "react-relay";
// import { graphql } from "babel-plugin-relay/macro";
// import Section from "../../UIComponents/Section/Section";
// import { ServerQuery } from "./__generated__/ServerQuery.graphql";

// const ServerQueryTag = graphql`
//     query ServerQuery {
//         ...ServerInfoDataFragment
//         ...ServerListDataFragment
//         ...ResourcesDataFragment
//     }
// `;

// export default function Server(){
        
//   const data = useLazyLoadQuery<ServerQuery>(
//     ServerQueryTag,
//     { },
//     { fetchPolicy: "store-and-network"},
//   );

//     return <>
//         <Section name="Server" component={<EdgeInfo dataRef={data} />}/>

//         <Section name="Metrics" component={<></>}/>

//         <Section name="Events" component={<></>}/>
//     </>
// }