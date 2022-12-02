import React, { useContext, useMemo, useState } from "react";

type MqttAuthClientsCtxProps = {
  children: React.ReactNode;
};

type MqttAuthClientsCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MqttAuthClientsCtx = React.createContext<MqttAuthClientsCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useMqttAuthClientsCtx = () => useContext(MqttAuthClientsCtx);
export function MqttAuthClientsCtxProvider({ children }: MqttAuthClientsCtxProps) {

  const [stetCtx, setStateCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: stetCtx,
      setId(id: string) {
        id && setStateCtx(id);
      },
    } as MqttAuthClientsCtxType;
  }, [stetCtx]);

  return <MqttAuthClientsCtx.Provider value={Ctx}>
    {children}
  </MqttAuthClientsCtx.Provider>;
}
