import React, { useContext, useMemo, useState } from "react";

// ---------------------------
type AdapterListCtxProps = {
  children: React.ReactNode;
};
type AdapterListCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MonitorAdapterListCtx = React.createContext<AdapterListCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useMonitorAdapterListCtx = () => useContext(MonitorAdapterListCtx);
export function AdapterListCtxProvider({ children }: AdapterListCtxProps) {

  const [AdapterListConId, SetAdapterListCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: AdapterListConId,
      setId(id: string) {
        id && SetAdapterListCtx(id);
      },
    } as AdapterListCtxType;
  }, [AdapterListConId]);

  return <MonitorAdapterListCtx.Provider value={Ctx}>
    {children}
  </MonitorAdapterListCtx.Provider>;
}
