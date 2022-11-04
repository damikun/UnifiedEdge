import clsx from "clsx";
import { useUserStore } from "../../Utils/UserProvider";

export default function Header(){
    return <div className={clsx("flex sticky top-0 h-16 bg-gradient-to-t",
    "to-slate-100 via-gray-100 from-gray-100 p-2 px-5 shadow-sm",
    "md:px-10 justify-end items-center z-10")}>
        <UserInfo/>
    </div>
}

type UserInfoProps ={

}

function UserInfo({}:UserInfoProps){

    const userStore = useUserStore();

    if(userStore?.user?.me == null){
        return null
    }

    return  <div className="flex select-none font-semibold text-gray-600">{userStore?.user?.me.userName}</div>
}