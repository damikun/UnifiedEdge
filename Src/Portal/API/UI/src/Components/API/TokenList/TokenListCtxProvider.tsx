import React, { useContext, useMemo, useState } from "react";

type TokenListCtxProps = {
  children: React.ReactNode;
};

type TokenListCtxType = {
  connection_id: string;
  setId(id:string): void;
};

export const TokenListCtx = React.createContext<TokenListCtxType>(
  {
    connection_id: "", setId: () => { }
  }
);

export const useTokenListCtx = () => useContext(TokenListCtx);
export function TokenListCtxProvider({ children }: TokenListCtxProps) {

  const [TokenListConId, SetTokenListCtx] = useState("");

  const Ctx = useMemo(() => {
    return {
      connection_id: TokenListConId,
      setId(id: string) {
        id && SetTokenListCtx(id);
      },
    } as TokenListCtxType;
  }, [TokenListConId]);

  return <TokenListCtx.Provider value={Ctx}>
    {children}
  </TokenListCtx.Provider>;
}
