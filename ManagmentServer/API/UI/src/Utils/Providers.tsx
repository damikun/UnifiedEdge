import { RelayEnv } from "../App";
import UserProvider from "./UserProvider";
import { createEnvironment } from "./Environment";
import { BrowserRouter as Router } from "react-router-dom";
import ToastProvider from "../UIComponents/Toast/ToastProvider";
import React, { Suspense, useContext, useMemo, useState } from "react"
import { UserProviderQuery } from "./__generated__/UserProviderQuery.graphql";
import { Environment, PreloadedQuery, RelayEnvironmentProvider } from "react-relay";

type ProvidersProps  = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  initialQueryRef: PreloadedQuery<UserProviderQuery>;
};

export const EnviromentContext = React.createContext<
EnviromentContextType | undefined
>(undefined);

type EnviromentContextType = {
  env: Environment;
  reset(): void;
};
  
export const useEnvirometHandler = () => useContext(EnviromentContext);

export default function Providers({ children, fallback, initialQueryRef }: ProvidersProps){

  const [envState, setEnvState] = useState(RelayEnv);

  const providerInit = useMemo(() => {
    return {
      env: envState,
      reset() {
        setEnvState(createEnvironment());
      },
    };
  }, [envState, setEnvState]);

    return (
      <EnviromentContext.Provider value={providerInit}>
        <EnviromentContext.Consumer>
          {(state) =>
            state && (
              <RelayEnvironmentProvider environment={state?.env}>
                <Router>
                  <Suspense fallback={fallback ? fallback : null}>
                    <UserProvider initialQueryRef={initialQueryRef}>
                      <ToastProvider>
                        {children}
                      </ToastProvider>
                    </UserProvider>
                  </Suspense>
                </Router>
              </RelayEnvironmentProvider>
            )
          }
        </EnviromentContext.Consumer>
      </EnviromentContext.Provider>
    );
}