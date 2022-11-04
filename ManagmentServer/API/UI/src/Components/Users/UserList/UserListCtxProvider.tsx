import React, { useContext, useMemo, useState } from "react";

type UserListCtxProps = {
  children: React.ReactNode;
};

type UserListCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MonitorUserListCtx = React.createContext<UserListCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useUserListCtx = () => useContext(MonitorUserListCtx);
export function UserListCtxProvider({ children }: UserListCtxProps) {

  const [UserListConId, SetUserListCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: UserListConId,
      setId(id: string) {
        id && SetUserListCtx(id);
      },
    } as UserListCtxType;
  }, [UserListConId]);

  return <MonitorUserListCtx.Provider value={Ctx}>
    {children}
  </MonitorUserListCtx.Provider>;
}
