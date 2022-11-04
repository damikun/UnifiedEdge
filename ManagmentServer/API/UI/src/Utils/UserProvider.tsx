import { PreloadedQuery } from "react-relay";
import React, { useContext, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import {  usePreloadedQuery } from "react-relay/hooks";
import * as MeQuery from "../Utils/__generated__/UserProviderQuery.graphql";


export const UserProviderQueryTag = graphql`
  query UserProviderQuery {
    me {
      id
      userName
      firstName
      lastName
      sessionId
    }
  }
`;

export type UserType = {
    readonly me: {
      readonly id: string;
      readonly userName: string | null;
      readonly sessionId: string | null;
  } | null;
} | null;

export type UserProviderProps = {
  children?: React.ReactNode;
  initialQueryRef: PreloadedQuery<MeQuery.UserProviderQuery>;
};

type userStoreContextType = {
  user: UserType;
};

export const userStoreContext = React.createContext<
  userStoreContextType | undefined
>(undefined);

export const useUserStore = () => useContext(userStoreContext);

export default function UserProvider({ children,initialQueryRef }: UserProviderProps) {

  const preloaded_user_data = usePreloadedQuery(
    UserProviderQueryTag,
    initialQueryRef
  );
  
  const userStoreInitCtx = useMemo(() => {
    return {
      user: preloaded_user_data,
    };
  }, [preloaded_user_data]);

  return (
    <userStoreContext.Provider value={userStoreInitCtx}>
      {children}
    </userStoreContext.Provider>
  );
}
