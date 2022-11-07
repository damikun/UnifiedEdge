import React, { useContext, useMemo, useState } from "react";

type WebHookListCtxProps = {
  children: React.ReactNode;
};

type WebHookListCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MonitorWebHookListCtx = React.createContext<WebHookListCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useWebHookListCtx = () => useContext(MonitorWebHookListCtx);
export function WebHookListCtxProvider({ children }: WebHookListCtxProps) {

  const [WebHookListConId, SetWebHookListCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: WebHookListConId,
      setId(id: string) {
        id && SetWebHookListCtx(id);
      },
    } as WebHookListCtxType;
  }, [WebHookListConId]);

  return <MonitorWebHookListCtx.Provider value={Ctx}>
    {children}
  </MonitorWebHookListCtx.Provider>;
}
