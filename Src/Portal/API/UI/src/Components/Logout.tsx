import {  useEffect } from "react";
import { LOGOUT_ENDPOINT } from "../constants";
import {useUser } from "../Utils/UserProvider";

export default function Logout() {

  const user = useUser();
    
      useEffect(() => {
        if(user?.me?.sessionId){
          window.location.href = `${LOGOUT_ENDPOINT}?sid=${user?.me?.sessionId}`;
        }else{
          window.location.href = LOGOUT_ENDPOINT;
        }

      }, [])

      return <></>
  }
  