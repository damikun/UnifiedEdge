import React from "react";
import { PreloadedQuery } from "react-relay";
import { graphQLSelector } from "recoil-relay";
import { VariablesOf } from "react-relay/hooks";
import { graphql } from "babel-plugin-relay/macro";
import { environmentKey,getNode, ResponseFrom } from "./Environment";
import * as MeQuery from "../Utils/__generated__/UserProviderQuery.graphql";
import { UserProviderQuery } from "../Utils/__generated__/UserProviderQuery.graphql";


export const UserProviderQueryTag = graphql`
  query UserProviderQuery @preloadable{
    me {
      id
      userName
      firstName
      lastName
      sessionId
    }
  }
`;

export const currentUserQuery = graphQLSelector<
  VariablesOf<UserProviderQuery>,
  ResponseFrom<UserProviderQuery>
>({
  key: 'CurrentUser',
  environment: environmentKey,
  query:getNode(UserProviderQueryTag),
  default: undefined,
  variables: {},
  mapResponse: data => data
});

export type UserProviderProps = {
  children?: React.ReactNode;
  initialQueryRef: PreloadedQuery<MeQuery.UserProviderQuery>;
};
export default function UserProvider({ children,initialQueryRef }: UserProviderProps) {

  // We dont need this because we sync with recoil store now!
  // const preloaded_user_data = usePreloadedQuery(
  //   UserProviderQueryTag,
  //   initialQueryRef
  // );
  
  return (
      {children}
  );
}
