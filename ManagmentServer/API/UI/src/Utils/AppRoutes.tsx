import { Route, Routes } from "react-router-dom";
import { useUserStore } from "./UserProvider";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import FourOhFour from "../Components/FourOhFour";
import Layout from "../Components/Layout/Layout";

export default function AppRoutes() {
  const userStore = useUserStore();

  if (!userStore?.user?.me) {
    
    return (
      <Routes>
        <Route path="/*" element={<Login/>} />
      </Routes>
    );
  } else {
    
    return (
      <Routes>

        <Route path={"*"} element={<Layout/>} />
        
        <Route path={"*"} element={<Layout/>} />
        
        <Route path={"/logout"} element={<Logout />} />

        <Route path="*" element={<FourOhFour />} />

      </Routes>
    );
  }
}