import clsx from "clsx";
import SideBar from "./Sidebar";
import MenuList from "./MenuList";
import MenuItem from "./MenuItem";
import { useCallback } from "react";
import MenuButton from "./MenuButton";
import BodyContainer from "./BodyContainer";
import { useLocalStorage } from "../../Utils/LocalStorage";
import { faDesktop, faEthernet, faGear, faInfo, faNoteSticky, faPlug, faServer, faSignal, faUsers } from "@fortawesome/free-solid-svg-icons";


export default function Layout(){
    const [sidebarState, setSidebarState] = useLocalStorage<boolean>("sidebar",true);

    const handleMenuButton = useCallback(
      () => {
        setSidebarState(!sidebarState)
      },
      [setSidebarState,sidebarState],
    )

    return <div className={clsx("h-screen w-screen bg-gradient-to-t to-slate-50",
        "via-gray-100 from-gray-200")}>
        <div className={clsx("flex shadow-md z-40 flex-row w-full h-screen",
            "overflow-hidden bg-gray-200 bg-opacity-50 transition-none")}>

            <SideBar>
                <MenuButton state={sidebarState} onClick={handleMenuButton}/>
            </SideBar>

            <MenuList state={sidebarState}>
                <MenuItem to="/Monitor" pattern="/Monitor/*" icon={faDesktop} name="Monitor" />
                <MenuItem to="/WebHooks" pattern="/WebHooks/*" icon={faServer} name="WebHooks" />
                {/* <MenuItem to="/Connections" icon={faLink} name="Connections" />
                <MenuItem to="/Analytics" icon={faChartLine} name="Analytics" />
                <MenuItem to="/Alarms" icon={faTriangleExclamation} name="Alarms" /> */}
                <MenuItem to="/Users" pattern="/Users/*" icon={faUsers} name="Users" />
                <MenuItem to="/System" pattern="/System/*" icon={faGear} name="System" />
                <MenuItem to="/Api" pattern="/Api/*" icon={faPlug} name="API" />
                <MenuItem to="/Documents" pattern="/Documents/*" icon={faNoteSticky} name="Documents" />
                <MenuItem to="/Info" icon={faInfo} name="Info" />
            </MenuList>

            <BodyContainer />

        </div>
    </div> 
}