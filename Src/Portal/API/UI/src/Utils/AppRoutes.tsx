import { useUser } from "./UserProvider";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import Layout from "../Components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import FourOhFour from "../Components/FourOhFour";


export default function AppRoutes() {
  const user = useUser();

  if (!user?.me) {
    
    return (
      <Routes>
        <Route path="/*" element={<Login/>} />
      </Routes>
    );
  } else {
    
    return (
      <Routes>

        <Route path={"*"} element={<Layout/>} />
        
        <Route path={"/logout"} element={<Logout />} />

        <Route path="*" element={<FourOhFour />} />

      </Routes>
    );
  }
}