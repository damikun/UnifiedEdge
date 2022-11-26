import React, { useContext, useMemo, useState } from "react";
import { SelectItemType } from "../../../../../UIComponents/SelectList/SelectList";

type MqttRecentMessagesCtxProps = {
  children: React.ReactNode;
};

type MqttRecentMessagesCtxType = {
  filtred_topic_id: SelectItemType<string>;
  filtred_client_id: SelectItemType<string>;
  setClient(item: SelectItemType<string>): void;
  setTopic(item: SelectItemType<string>): void;
};

export const defaultClinet = {
  id: undefined,
  data: "All Clients",
  displayName: "All Clients",
} as SelectItemType<string>

export const defaultTopic = {
  id: undefined,
  data: "All Topics",
  displayName: "All Topics",
} as SelectItemType<string>

export const MqttRecentMessagesListCtx = React.createContext<MqttRecentMessagesCtxType>(
  {
    filtred_topic_id: defaultTopic,
    filtred_client_id: defaultClinet,
    setClient: () => { },
    setTopic: () => { },
  }
);

export const useMqttRecentMessagesListCtx = () => useContext(MqttRecentMessagesListCtx);

export function MqttRecentMessagesCtxProvider({ children }: MqttRecentMessagesCtxProps) {

  const [topic, setTopic] = useState(defaultTopic);

  const [client, setClient] = useState(defaultClinet);

  const context = useMemo(() => {
    return {
      filtred_topic_id: topic,
      filtred_client_id: client,
      setClient(item: SelectItemType<string>) {
        setClient(client);
      },
      setTopic(item: SelectItemType<string>) {
        setTopic(topic);
      },
    } as MqttRecentMessagesCtxType;
  }, [topic, client, setClient, setTopic]);

  return <MqttRecentMessagesListCtx.Provider value={context}>
    {children}
  </MqttRecentMessagesListCtx.Provider>;
}