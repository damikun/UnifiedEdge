import clsx from "clsx";
import SideBar from "./Sidebar";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import MenuButton from "./MenuButton";
import BodyContainer from "./BodyContainer";
import { useCallback, useState } from "react";
import { faDesktop, faGear, faInfo, faServer, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Layout(){

    const [isOpen,setOpen] = useState(true);

    const handleMenuButton = useCallback(
      () => {
        setOpen(e=>!e)
      },
      [setOpen],
    )
    
    return <div className={clsx("h-screen w-screen bg-gradient-to-t to-slate-50",
        "via-gray-50 from-gray-200")}>
        <div className={clsx("flex shadow-md z-40 flex-row w-full h-screen",
            "overflow-hidden bg-gray-200 bg-opacity-50")}>

            <SideBar>
                <MenuButton state={isOpen} onClick={handleMenuButton}/>
            </SideBar>

            <MenuList state={isOpen}>
                <MenuItem to="/Monitor" pattern="/Monitor/*" icon={faDesktop} name="Monitor" />
                <MenuItem to="/WebHooks" pattern="/WebHooks/*" icon={faServer} name="WebHooks" />
                {/* <MenuItem to="/Connections" icon={faLink} name="Connections" />
                <MenuItem to="/Analytics" icon={faChartLine} name="Analytics" />
                <MenuItem to="/Alarms" icon={faTriangleExclamation} name="Alarms" /> */}
                <MenuItem to="/Users" icon={faUsers} name="Users" />
                <MenuItem to="/System" pattern="/System/*"  icon={faGear} name="System" />
                <MenuItem to="/Help" icon={faInfo} name="Help" />
            </MenuList>

            <BodyContainer state={isOpen} />

        </div>
    </div> 
}