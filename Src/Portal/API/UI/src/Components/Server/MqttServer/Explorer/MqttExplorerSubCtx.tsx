import React, { useContext, useMemo, useState } from "react";

type MqttExplorerSubCtxProps = {
  children: React.ReactNode;
};

type MqttExplorerSubCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MqttExplorerSubCtx = React.createContext<MqttExplorerSubCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useMqttExplorerSubCtx = () => useContext(MqttExplorerSubCtx);

export function MqttExplorerSubCtxProvider({ children }: MqttExplorerSubCtxProps) {

  const [stetCtx, setStateCtx] = useState("");
  
  const Ctx = useMemo(() => {
    return {
      connection_id: stetCtx,
      setId(id: string) {
        id && setStateCtx(id);
      },
    } as MqttExplorerSubCtxType;
  }, [stetCtx]);

  return <MqttExplorerSubCtx.Provider value={Ctx}>
    {children}
  </MqttExplorerSubCtx.Provider>;
}
