import {  useEffect } from "react";
import { useRecoilValue } from "recoil";
import { LOGOUT_ENDPOINT } from "../constants";
import { currentUserQuery } from "../Utils/UserProvider";

export default function Logout() {

  const user = useRecoilValue(currentUserQuery);
    
      useEffect(() => {
        if(user?.me?.sessionId){
          window.location.href = `${LOGOUT_ENDPOINT}?sid=${user?.me?.sessionId}`;
        }else{
          window.location.href = LOGOUT_ENDPOINT;
        }

      }, [])

      return <></>
  }
  