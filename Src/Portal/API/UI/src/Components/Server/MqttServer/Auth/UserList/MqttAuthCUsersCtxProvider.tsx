import React, { useContext, useMemo, useState } from "react";

type MqttAuthUsersCtxProps = {
  children: React.ReactNode;
};

type MqttAuthUsersCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const MqttAuthUsersCtx = React.createContext<MqttAuthUsersCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useMqttAuthUsersCtx = () => useContext(MqttAuthUsersCtx);
export function MqttAuthUsersCtxProvider({ children }: MqttAuthUsersCtxProps) {

  const [stetCtx, setStateCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: stetCtx,
      setId(id: string) {
        id && setStateCtx(id);
      },
    } as MqttAuthUsersCtxType;
  }, [stetCtx]);

  return <MqttAuthUsersCtx.Provider value={Ctx}>
    {children}
  </MqttAuthUsersCtx.Provider>;
}
