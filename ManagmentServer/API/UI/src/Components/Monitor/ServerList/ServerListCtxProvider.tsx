import React, { useContext, useMemo, useState } from "react";

type ServerListCtxProps = {
  children: React.ReactNode;
};

type ServerListCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MonitorServerListCtx = React.createContext<ServerListCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useMonitorServerListCtx = () => useContext(MonitorServerListCtx);
export function ServerListCtxProvider({ children }: ServerListCtxProps) {

  const [ServerListConId, SetServerListCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: ServerListConId,
      setId(id: string) {
        id && SetServerListCtx(id);
      },
    } as ServerListCtxType;
  }, [ServerListConId]);

  return <MonitorServerListCtx.Provider value={Ctx}>
    {children}
  </MonitorServerListCtx.Provider>;
}
