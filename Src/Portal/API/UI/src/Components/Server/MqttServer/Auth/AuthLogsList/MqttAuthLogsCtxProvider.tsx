import React, { useContext, useMemo, useState } from "react";
import { SelectItemType } from "../../../../../UIComponents/SelectList/SelectList";

type MqttAuthLogsCtxProps = {
  children: React.ReactNode;
};

type MqttAuthLogsCtxType = {
  connection_id: string;
  client_filter: SelectItemType<string>;
  user_filter: SelectItemType<string>;
  setUserFilter(enity: SelectItemType<string>):void;
  setClientFilter(enity: SelectItemType<string>):void
  setId(id:string): void;
};

export const defaultClinet = {
  id: undefined,
  data: "All Clients",
  displayName: "All Clients",
} as SelectItemType<string>

export const defaultUser = {
  id: undefined,
  data: "All Users",
  displayName: "All Users",
} as SelectItemType<string>


export const MqttAuthLogsCtx = React.createContext<MqttAuthLogsCtxType>(
{
  client_filter:defaultClinet,
  user_filter: defaultUser,
  connection_id: "", 
  setId: () => { },
  setUserFilter: () => { },
  setClientFilter: () => { }
}
);

export const useMqttAuthLogsCtx = () => useContext(MqttAuthLogsCtx);
export function MqttAuthLogsCtxProvider({ children }: MqttAuthLogsCtxProps) {

  const [connectionId, setConnectionId] = useState("");

  const [clientFilter, setClientFilter] = useState<SelectItemType<string>>(defaultClinet);

  const [userFilter, setUserFilter] = useState<SelectItemType<string>>(defaultUser);

  const Ctx = useMemo(() => {
    return {
      client_filter: clientFilter,
      user_filter: userFilter,
      setClientFilter(enity: SelectItemType<string>) {
        setClientFilter(enity);
      },
      setUserFilter(enity: SelectItemType<string>) {
        setUserFilter(enity);
      },
      connection_id: connectionId,
      setId(id: string) {
        id && setConnectionId(id);
      },
    } as MqttAuthLogsCtxType;
  }, [connectionId,clientFilter,userFilter]);

  return <MqttAuthLogsCtx.Provider value={Ctx}>
    {children}
  </MqttAuthLogsCtx.Provider>;
}
