import { graphql } from "babel-plugin-relay/macro";

export const ServerSharedInfoFragmentTag = graphql`
  fragment ServerSharedInfoFragment on GQL_IServer 
  {
    id
  }
`;