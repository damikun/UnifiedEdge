import { loadQuery } from "react-relay";
import AppRoutes from "./Utils/AppRoutes";
import Providers from "./Utils/Providers";
import { createEnvironment } from "./Utils/Environment";
import { UserProviderQueryTag } from "./Utils/UserProvider";
import { UserProviderQuery } from "./Utils/__generated__/UserProviderQuery.graphql";

export const RelayEnv = createEnvironment();

const initialQueryRef = loadQuery<UserProviderQuery>(
  RelayEnv,
  UserProviderQueryTag,
  {}
);

function App() {
  return (
    <Providers initialQueryRef={initialQueryRef} fallback={null}>
      <AppRoutes/>
    </Providers>
  );
}

export default App;
